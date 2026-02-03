@extends('admin.layout')

@section('title', 'Upravit rezervaci')

@section('content')
<div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Upravit rezervaci #{{ $reservation->id }}</h2>
    
    <form action="{{ route('admin.reservations.update', $reservation->id) }}" method="POST">
        @csrf
        @method('PUT')
        
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Jméno</label>
            <input type="text" value="{{ $reservation->name }}" disabled class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
        </div>

        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value="{{ $reservation->email }}" disabled class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
        </div>

        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
            <input type="text" value="{{ $reservation->phone }}" disabled class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label for="from" class="block text-sm font-medium text-gray-700 mb-2">Od *</label>
                <input type="date" id="from" name="from" value="{{ \Carbon\Carbon::parse($reservation->from)->format('Y-m-d') }}" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label for="to" class="block text-sm font-medium text-gray-700 mb-2">Do *</label>
                <input type="date" id="to" name="to" value="{{ \Carbon\Carbon::parse($reservation->to)->format('Y-m-d') }}" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>

        <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select id="status" name="status" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="PENDING" {{ $reservation->status === 'PENDING' ? 'selected' : '' }}>🟡 Čeká na potvrzení</option>
                <option value="CONFIRMED" {{ $reservation->status === 'CONFIRMED' ? 'selected' : '' }}>🟢 Potvrzeno</option>
                <option value="CANCELED" {{ $reservation->status === 'CANCELED' ? 'selected' : '' }}>🔴 Zrušeno</option>
            </select>
        </div>

        <div class="mb-6">
            <label for="note" class="block text-sm font-medium text-gray-700 mb-2">Poznámka</label>
            <textarea id="note" name="note" rows="4"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{{ $reservation->note }}</textarea>
        </div>

        <div class="flex gap-4">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                💾 Uložit změny
            </button>
            <a href="{{ route('admin.dashboard') }}" class="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition">
                ← Zpět
            </a>
        </div>
    </form>
</div>
@endsection
