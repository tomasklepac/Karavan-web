<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationConfirmed;

class AdminController extends Controller
{
    public function showLogin()
    {
        if (session('admin_logged_in')) {
            return redirect()->route('admin.dashboard');
        }
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $username = env('ADMIN_USERNAME', 'admin');
        $password = env('ADMIN_PASSWORD', 'admin123');

        if ($request->username === $username && $request->password === $password) {
            session(['admin_logged_in' => true]);
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['login' => 'Nesprávné přihlašovací údaje.']);
    }

    public function logout()
    {
        session()->forget('admin_logged_in');
        return redirect()->route('admin.login');
    }

    public function dashboard(Request $request)
    {
        $query = Reservation::query()->orderBy('from', 'asc');

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', strtoupper($request->status));
        } else {
            // By default, hide CANCELED reservations
            $query->whereIn('status', ['PENDING', 'CONFIRMED']);
        }

        $reservations = $query->get();
        $statusFilter = $request->get('status', 'all');

        return view('admin.dashboard', compact('reservations', 'statusFilter'));
    }

    public function calendar()
    {
        $reservations = Reservation::whereIn('status', ['PENDING', 'CONFIRMED'])
            ->orderBy('from')
            ->get();

        return view('admin.calendar', compact('reservations'));
    }

    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);
        return response()->json($reservation);
    }

    public function edit($id)
    {
        $reservation = Reservation::findOrFail($id);
        return view('admin.edit', compact('reservation'));
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validated = $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after:from',
            'note' => 'nullable|string',
            'status' => 'required|in:PENDING,CONFIRMED,CANCELED',
        ]);

        // Check for conflicts (excluding current reservation)
        $conflict = Reservation::where('id', '!=', $id)
            ->where('status', '!=', 'CANCELED')
            ->where(function ($query) use ($validated) {
                $query->whereBetween('from', [$validated['from'], $validated['to']])
                      ->orWhereBetween('to', [$validated['from'], $validated['to']])
                      ->orWhere(function ($q) use ($validated) {
                          $q->where('from', '<=', $validated['from'])
                            ->where('to', '>=', $validated['to']);
                      });
            })->exists();

        if ($conflict) {
            return back()->withErrors(['conflict' => 'Konflikt s jinou rezervací!']);
        }

        $oldStatus = $reservation->status;
        $reservation->update($validated);

        // Send confirmation email if status changed to CONFIRMED
        if ($oldStatus !== 'CONFIRMED' && $validated['status'] === 'CONFIRMED') {
            Mail::to($reservation->email)->send(new ReservationConfirmed($reservation));
        }

        return redirect()->route('admin.dashboard')->with('success', 'Rezervace aktualizována.');
    }

    public function updateStatus(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:CONFIRMED,CANCELED',
        ]);

        $oldStatus = $reservation->status;
        $reservation->update(['status' => $validated['status']]);

        // Send confirmation email if confirmed
        if ($oldStatus !== 'CONFIRMED' && $validated['status'] === 'CONFIRMED') {
            Mail::to($reservation->email)->send(new ReservationConfirmed($reservation));
        }

        return back()->with('success', 'Status aktualizován.');
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return back()->with('success', 'Rezervace smazána.');
    }
}
