<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\ReservationController;

// --- Public API ---
Route::get('/availability', [ReservationController::class, 'availability']);
Route::post('/reservations', [ReservationController::class, 'store']);

// --- Admin API ---
Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return response()->json(['message' => 'Admin dashboard']);
    });
    
    Route::get('/reservations/{id}', function ($id) {
        return response()->json(['message' => "Reservation detail $id"]);
    });

    Route::post('/reservations/{id}/confirm', function ($id) {
        return response()->json(['message' => "Reservation $id confirmed"]);
    });

    Route::post('/reservations/{id}/reject', function ($id) {
        return response()->json(['message' => "Reservation $id rejected"]);
    });

    Route::post('/reservations/{id}/cancel', function ($id) {
        return response()->json(['message' => "Reservation $id canceled"]);
    });
});
