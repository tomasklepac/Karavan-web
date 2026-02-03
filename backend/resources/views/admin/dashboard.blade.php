@extends('admin.layout')

@section('title', 'Dashboard - Rezervace')

@section('content')
<div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Přehled rezervací</h2>
        
        <div class="flex flex-wrap gap-2">
            <a href="{{ route('admin.dashboard', ['status' => 'all']) }}" 
               class="px-3 py-2 text-sm rounded {{ $statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200' }}">
                Všechny ({{ $reservations->count() }})
            </a>
            <a href="{{ route('admin.dashboard', ['status' => 'pending']) }}" 
               class="px-3 py-2 text-sm rounded {{ $statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200' }}">
                Čekající
            </a>
            <a href="{{ route('admin.dashboard', ['status' => 'confirmed']) }}" 
               class="px-3 py-2 text-sm rounded {{ $statusFilter === 'confirmed' ? 'bg-green-600 text-white' : 'bg-gray-200' }}">
                Potvrzené
            </a>
            <a href="{{ route('admin.dashboard', ['status' => 'canceled']) }}" 
               class="px-3 py-2 text-sm rounded {{ $statusFilter === 'canceled' ? 'bg-red-600 text-white' : 'bg-gray-200' }}">
                Zrušené
            </a>
        </div>
    </div>

    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-100 border-b">
                    <th class="p-3 text-center border-r border-gray-300">ID</th>
                    <th class="p-3 text-center border-r border-gray-300">Jméno</th>
                    <th class="p-3 text-center border-r border-gray-300">Email</th>
                    <th class="p-3 text-center border-r border-gray-300">Telefon</th>
                    <th class="p-3 text-center border-r border-gray-300">Od</th>
                    <th class="p-3 text-center border-r border-gray-300">Do</th>
                    <th class="p-3 text-center border-r border-gray-300">Noci</th>
                    <th class="p-3 text-center border-r border-gray-300">Status</th>
                    <th class="p-3 text-center">Akce</th>
                </tr>
            </thead>
            <tbody>
                @forelse($reservations as $reservation)
                <tr class="border-b hover:bg-gray-50">
                    <td class="p-3 border-r border-gray-200">{{ $reservation->id }}</td>
                    <td class="p-3 font-semibold border-r border-gray-200">{{ $reservation->name }}</td>
                    <td class="p-3 border-r border-gray-200">{{ $reservation->email }}</td>
                    <td class="p-3 border-r border-gray-200">{{ $reservation->phone }}</td>
                    <td class="p-3 border-r border-gray-200">{{ \Carbon\Carbon::parse($reservation->from)->format('d.m.Y') }}</td>
                    <td class="p-3 border-r border-gray-200">{{ \Carbon\Carbon::parse($reservation->to)->format('d.m.Y') }}</td>
                    <td class="p-3 border-r border-gray-200">{{ \Carbon\Carbon::parse($reservation->from)->startOfDay()->diffInDays(\Carbon\Carbon::parse($reservation->to)->startOfDay()) }}</td>
                    <td class="p-3 border-r border-gray-200">
                        @if($reservation->status === 'PENDING')
                            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">🟡 Čeká</span>
                        @elseif($reservation->status === 'CONFIRMED')
                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">🟢 Potvrzeno</span>
                        @else
                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">🔴 Zrušeno</span>
                        @endif
                    </td>
                    <td class="p-3">
                        <div class="flex gap-2">
                            <button onclick="viewDetails({{ $reservation->id }})" class="text-blue-600 hover:underline text-sm">👁️ Detail</button>
                            <a href="{{ route('admin.reservations.edit', $reservation->id) }}" class="text-blue-600 hover:underline text-sm">✏️ Upravit</a>
                            
                            @if($reservation->status === 'PENDING')
                            <form action="{{ route('admin.reservations.status', $reservation->id) }}" method="POST" class="inline">
                                @csrf
                                <input type="hidden" name="status" value="CONFIRMED">
                                <button type="submit" class="text-green-600 hover:underline text-sm">✅ Potvrdit</button>
                            </form>
                            @endif
                            
                            @if($reservation->status !== 'CANCELED')
                            <form action="{{ route('admin.reservations.status', $reservation->id) }}" method="POST" class="inline" onsubmit="return confirm('Opravdu chcete zrušit tuto rezervaci?')">
                                @csrf
                                <input type="hidden" name="status" value="CANCELED">
                                <button type="submit" class="text-red-600 hover:underline text-sm">❌ Zrušit</button>
                            </form>
                            @endif
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="9" class="p-6 text-center text-gray-500">Žádné rezervace</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<!-- Detail Modal -->
<div id="detailModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Detail rezervace</h3>
            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div id="detailContent" class="space-y-2">
            <!-- Content loaded via JS -->
        </div>
    </div>
</div>

<script>
function viewDetails(id) {
    fetch(`/karavan-web/backend/public/admin/reservations/${id}`)
        .then(res => res.json())
        .then(data => {
            const from = new Date(data.from).toLocaleDateString('cs-CZ');
            const to = new Date(data.to).toLocaleDateString('cs-CZ');
            const fromDate = new Date(data.from);
            const toDate = new Date(data.to);
            const days = Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
            
            document.getElementById('detailContent').innerHTML = `
                <p><strong>Jméno:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Telefon:</strong> ${data.phone}</p>
                <p><strong>Od:</strong> ${from}</p>
                <p><strong>Do:</strong> ${to}</p>
                <p><strong>Počet dní:</strong> ${days}</p>
                <p><strong>Status:</strong> ${data.status}</p>
                <p><strong>Poznámka:</strong></p>
                <div class="bg-gray-50 p-3 rounded" style="white-space: pre-line;">${data.note || 'Žádná poznámka'}</div>
            `;
            document.getElementById('detailModal').classList.remove('hidden');
        });
}

function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}
</script>
@endsection
