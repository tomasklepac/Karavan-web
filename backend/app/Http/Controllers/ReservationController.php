<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;

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

        $newFrom = Carbon::parse($validated['from']);
        $newTo = Carbon::parse($validated['to']);

        // Collision Check:
        // (newFrom < existingTo) AND (newTo > existingFrom)
        // against PENDING or CONFIRMED
        $collision = Reservation::whereIn('status', ['PENDING', 'CONFIRMED'])
            ->where(function ($query) use ($newFrom, $newTo) {
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
        ]);

        return response()->json($reservation, 201);
    }
}
