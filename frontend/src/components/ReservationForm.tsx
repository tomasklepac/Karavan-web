import { useState } from 'react';
import { api, CreateReservationData } from '../services/api';

interface ReservationFormProps {
    from: Date;
    to: Date;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ReservationForm({ from, to, onSuccess, onCancel }: ReservationFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        note: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.createReservation({
                from: from.toISOString(),
                to: to.toISOString(),
                ...formData
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
            </p>

            {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

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

            <div>
                <label className="block text-sm font-medium">Poznámka (volitelné)</label>
                <textarea
                    className="w-full p-2 border rounded mt-1"
                    rows={3}
                    value={formData.note}
                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                />
            </div>

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
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Odesílám...' : 'Rezervovat závazně'}
                </button>
            </div>
        </form>
    );
}
