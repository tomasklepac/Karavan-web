<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reservations/cancel/{token}', [\App\Http\Controllers\ReservationController::class, 'cancelByToken'])->name('reservations.cancel');

// Admin routes
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminController::class, 'showLogin'])->name('admin.login');
    Route::post('/login', [AdminController::class, 'login']);
    Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');

    Route::middleware('admin.auth')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/calendar', [AdminController::class, 'calendar'])->name('admin.calendar');
        Route::get('/reservations/{id}', [AdminController::class, 'show'])->name('admin.reservations.show');
        Route::get('/reservations/{id}/edit', [AdminController::class, 'edit'])->name('admin.reservations.edit');
        Route::put('/reservations/{id}', [AdminController::class, 'update'])->name('admin.reservations.update');
        Route::post('/reservations/{id}/status', [AdminController::class, 'updateStatus'])->name('admin.reservations.status');
        Route::delete('/reservations/{id}', [AdminController::class, 'destroy'])->name('admin.reservations.destroy');
    });
});
