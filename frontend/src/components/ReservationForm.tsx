import { useState, useMemo } from 'react';
import { api, CreateReservationData } from '../services/api';
import { differenceInDays } from 'date-fns';

interface ReservationFormProps {
    from: Date;
    to: Date;
    onSuccess: () => void;
    onCancel: () => void;
}

// Seasonal pricing (from instructions_add.md)
const SEASONAL_PRICING = [
    { months: [1, 2, 3], price: 3000, label: 'Leden – Březen' },
    { months: [4, 5], price: 3200, label: 'Duben – Květen' },
    { months: [6, 7, 8, 9], price: 3900, label: 'Červen – Září' },
    { months: [10, 11, 12], price: 2800, label: 'Říjen – Prosinec' },
];

const ACCESSORIES = [
    { id: 'trailer', label: 'Skříňový přívěs 250 × 150', price: 500 },
    { id: 'scooter', label: 'Skútr Honda PCX 125', price: 600 },
    { id: 'escooter', label: 'Elektrokoloběžka', price: 200, unit: 'ks' },
    { id: 'ebike', label: 'Elektrokolo', price: 400, unit: 'ks' },
    { id: 'generator', label: 'Elektrocentrála 3kW', price: 200 },
    { id: 'camping_set', label: 'Kempingový set (stůl + 4 židle)', price: 200 },
    { id: 'grill', label: 'Gril (elektrický / na dřevěné uhlí)', price: 100 },
    { id: 'coffee', label: 'Kávovar Tchibo Cafissimo', price: 50 },
    { id: 'coffee_caps', label: 'Kávové kapsle', price: 10 },
    { id: 'carpet', label: 'Koberec před obytný vůz 400 × 250', price: 100 },
    { id: 'awning', label: 'Nafukovací předstan 400 × 250', price: 400 },
    { id: 'kitchen', label: 'Kempingová kuchyňka', price: 100 },
    { id: 'projector', label: 'Projektor + plátno', price: 200 },
];

const SERVICE_FEE = 1500;

export default function ReservationForm({ from, to, onSuccess, onCancel }: ReservationFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        note: '',
    });

    // Calculate number of nights (days - 1)
    const numDays = useMemo(() => {
        return differenceInDays(to, from); // Nights = days between dates
    }, [from, to]);

    // Calculate total rental price by summing each night's rate
    const rentalPrice = useMemo(() => {
        let total = 0;
        const currentDate = new Date(from);
        const endDate = new Date(to);

        // Loop through nights (not including the last day)
        while (currentDate < endDate) {
            const month = currentDate.getMonth() + 1; // 1-indexed
            const season = SEASONAL_PRICING.find(s => s.months.includes(month));
            const dailyRate = season ? season.price : 3000;
            total += dailyRate;

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return total;
    }, [from, to]);

    // Calculate base price (rental + service fee)
    const basePrice = useMemo(() => {
        return rentalPrice + SERVICE_FEE;
    }, [rentalPrice]);

    const toggleAccessory = (id: string) => {
        setSelectedAccessories(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!from || !to) return;

        // Validate minimum reservation length
        const nights = numDays;
        const startMonth = from.getMonth() + 1; // 1-indexed
        const isSummer = startMonth >= 6 && startMonth <= 9; // June-September
        const minNights = isSummer ? 7 : 3;

        if (nights < minNights) {
            setError(`Minimální délka rezervace je ${minNights} ${minNights === 3 ? 'noci' : 'nocí'}${isSummer ? ' (červen-září)' : ''}.`);
            return;
        }

        setLoading(true);
        setError(null);

        // Build note with accessories
        let finalNote = formData.note || '';
        if (selectedAccessories.length > 0) {
            const accessoryList = selectedAccessories
                .map(id => {
                    const acc = ACCESSORIES.find(a => a.id === id);
                    return acc ? `- ${acc.label}${acc.unit ? ` (${acc.unit})` : ''} (${acc.price} Kč)` : '';
                })
                .filter(Boolean)
                .join('\n');

            const accessoryNote = `\n\n--- Vybrané doplňky ---\n${accessoryList}`;
            finalNote = finalNote ? finalNote + accessoryNote : accessoryNote.trim();
        }

        // Format dates as YYYY-MM-DD to avoid timezone issues
        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        try {
            await api.createReservation({
                from: formatDate(from),
                to: formatDate(to),
                ...formData,
                note: finalNote,
            });
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Nastala chyba při rezervaci.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow-sm">
            <h3 className="text-xl font-bold mb-4">Dokončení rezervace</h3>
            <p className="text-sm text-gray-600 mb-4">
                Termín: <strong>{from.toLocaleDateString()}</strong> - <strong>{to.toLocaleDateString()}</strong>
                <span className="block mt-1">Počet nocí: <strong>{numDays}</strong></span>
                <span className="block mt-2 text-xs text-gray-500">
                    Vyzvednutí od 15:00, vrácení do 10:00.
                </span>
            </p>

            {/* Price Estimate */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Orientační cena</h4>
                <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                        <span>Pronájem ({numDays} nocí)</span>
                        <span className="font-semibold">{rentalPrice.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Servisní poplatek</span>
                        <span className="font-semibold">{SERVICE_FEE.toLocaleString()} Kč</span>
                    </div>
                    <div className="border-t border-blue-300 pt-2 mt-2 flex justify-between text-base">
                        <span className="font-bold">Celkem (bez doplňků)</span>
                        <span className="font-bold text-blue-900">{basePrice.toLocaleString()} Kč</span>
                    </div>
                    {selectedAccessories.length > 0 && (
                        <p className="text-xs text-blue-700 mt-1">+ vybrané doplňky (cena dle délky pronájmu)</p>
                    )}
                </div>
            </div>



            <div>
                <label className="block text-sm font-medium">Celé jméno</label>
                <input
                    required
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">E-mail</label>
                    <input
                        required
                        type="email"
                        className="w-full p-2 border rounded mt-1"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Telefon</label>
                    <input
                        required
                        type="tel"
                        className="w-full p-2 border rounded mt-1"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
            </div>

            {/* Accessories */}
            <div>
                <label className="block text-sm font-medium mb-2">Doplňkové příslušenství (volitelné)</label>
                <div className="grid grid-cols-1 gap-2 bg-gray-50 p-3 rounded border">
                    {ACCESSORIES.map(acc => (
                        <label key={acc.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                            <input
                                type="checkbox"
                                checked={selectedAccessories.includes(acc.id)}
                                onChange={() => toggleAccessory(acc.id)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm flex-1">{acc.label}{acc.unit ? ` (${acc.unit})` : ''}</span>
                            <span className="text-sm font-semibold text-gray-700">{acc.price} Kč</span>
                        </label>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Vybrané doplňky budou přidány do poznámky.</p>
            </div>

            <div>
                <label className="block text-sm font-medium">Poznámka (volitelné)</label>
                <textarea
                    className="w-full p-2 border rounded mt-1"
                    rows={3}
                    placeholder="Např. čas převzetí, speciální požadavky..."
                    value={formData.note}
                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                />
            </div>

            {error && <div className="p-3 bg-red-100 text-red-700 rounded mt-4">{error}</div>}

            <div className="flex gap-2 justify-end mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    disabled={loading}
                >
                    Zrušit
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    disabled={loading}
                >
                    {loading && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {loading ? 'Odesílám...' : 'Rezervovat závazně'}
                </button>
            </div>
        </form>
    );
}
