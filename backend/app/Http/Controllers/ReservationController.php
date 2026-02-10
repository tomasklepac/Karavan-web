<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationReceived;
use App\Mail\NewReservationAdmin;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ReservationController extends Controller
{
    /**
     * GET /api/availability
     * Returns intervals of 'PENDING' + 'CONFIRMED' reservations.
     */
    public function availability()
    {
        $reservations = Reservation::whereIn('status', ['PENDING', 'CONFIRMED'])
            ->select('from', 'to', 'status')
            ->get();

        return response()->json($reservations);
    }

    /**
     * POST /api/reservations
     * Creates a new reservation if no collision exists.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after:from',
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:190',
            'phone' => 'required|string|max:40',
            'note' => 'nullable|string',
        ]);

        // Parse dates at noon to avoid timezone issues
        $newFrom = Carbon::parse($validated['from'])->setTime(12, 0, 0);
        $newTo = Carbon::parse($validated['to'])->setTime(12, 0, 0);
        
        // Validate minimum reservation length
        $nights = $newFrom->diffInDays($newTo);
        $startMonth = $newFrom->month;
        $isSummer = $startMonth >= 6 && $startMonth <= 9; // June-September
        $minNights = $isSummer ? 7 : 3;
        
        if ($nights < $minNights) {
            return response()->json([
                'message' => "Minimální délka rezervace je {$minNights} " . ($minNights === 3 ? 'noci' : 'nocí') . ($isSummer ? ' (červen-září)' : '') . '.',
                'error' => 'minimum_length_not_met'
            ], 422);
        }

        // Collision Check with same-day handover support:
        // Allow: reservation ending on 16th + reservation starting on 16th
        // Block only if ranges actually overlap (not just touch at boundaries)
        // New: 10-16, Existing: 16-20 → NO collision (16 is handover day)
        // New: 10-17, Existing: 16-20 → COLLISION (17 overlaps with 16-20)
        $collision = Reservation::whereIn('status', ['PENDING', 'CONFIRMED'])
            ->where(function ($query) use ($newFrom, $newTo) {
                // Check if new reservation's range overlaps with existing
                // Overlap exists if: newFrom < existingTo AND newTo > existingFrom
                $query->where('to', '>', $newFrom)
                      ->where('from', '<', $newTo);
            })
            ->exists();

        if ($collision) {
            return response()->json([
                'message' => 'Termín je již obsazený.',
                'error' => 'collision_detected'
            ], 409);
        }

        $reservation = Reservation::create([
            'from' => $newFrom,
            'to' => $newTo,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'note' => $validated['note'] ?? null,
            'status' => 'PENDING',
            'cancel_token' => Str::random(32),
        ]);

        // Send emails
        try {
            // Email to client
            Mail::to($reservation->email)->send(new ReservationReceived($reservation));
            
            // Email to admin
            $adminEmail = env('ADMIN_EMAIL', 'admin@example.com');
            Mail::to($adminEmail)->send(new NewReservationAdmin($reservation));
        } catch (\Exception $e) {
            // Log error but don't fail the reservation
            \Log::error('Email sending failed: ' . $e->getMessage());
        }

        return response()->json($reservation, 201);
    }

    /**
     * Cancel reservation via token (from email link)
     */
    public function cancelByToken($token)
    {
        $reservation = Reservation::where('cancel_token', $token)->first();

        if (!$reservation) {
            return view('reservation.cancelled', ['status' => 'error', 'message' => 'Neplatný odkaz pro zrušení rezervace.']);
        }

        if ($reservation->status === 'CANCELED') {
            return view('reservation.cancelled', ['status' => 'info', 'message' => 'Tato rezervace již byla zrušena.']);
        }

        if ($reservation->status !== 'PENDING') {
            return view('reservation.cancelled', ['status' => 'error', 'message' => 'Tuto rezervaci již nelze zrušit online. Kontaktujte nás prosím telefonicky.']);
        }

        $reservation->update(['status' => 'CANCELED']);

        // Optional: Notify admin about cancellation (could reuse existing mail logic or add new one)
        // For MVP we just cancel it.

        return view('reservation.cancelled', ['status' => 'success', 'message' => 'Rezervace byla úspěšně zrušena.']);
    }
}
