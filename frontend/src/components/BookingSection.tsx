'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { api, Reservation } from '../services/api';
import ReservationForm from './ReservationForm';
import { isWithinInterval, parseISO, startOfDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './calendar-overrides.css'; // We will create this for custom styles

export default function BookingSection() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchReservations = async () => {
        try {
            const data = await api.getAvailability();
            setReservations(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const isTileDisabled = ({ date, view }: { date: Date, view: string }) => {
        if (view !== 'month') return false;
        // Disable past dates
        if (date < startOfDay(new Date())) return true;

        const checkDate = startOfDay(date);

        // Check if this date is a start date of any reservation
        const isStartDate = reservations.some(res =>
            startOfDay(parseISO(res.from)).getTime() === checkDate.getTime()
        );

        // Check if this date is an end date of any reservation
        const isEndDate = reservations.some(res =>
            startOfDay(parseISO(res.to)).getTime() === checkDate.getTime()
        );

        // Block if date is BOTH start AND end (different reservations on same day)
        if (isStartDate && isEndDate) return true;

        // Block middle days (between start and end of same reservation)
        return reservations.some(res => {
            const start = startOfDay(parseISO(res.from));
            const end = startOfDay(parseISO(res.to));
            return checkDate > start && checkDate < end;
        });
    };

    const handleDateChange = (value: any) => {
        if (Array.isArray(value) && value.length === 2) {
            setDateRange([value[0], value[1]]);
            setShowForm(true);
        } else {
            // Handle single date selection if needed, or ignore
            setDateRange(null);
            setShowForm(false);
        }
    };

    return (
        <section id="rezervace" className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Rezervace Karavanu</h2>

            {loading ? (
                <p className="text-center">Načítám kalendář...</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold mb-4">Vyberte termín</h3>
                        <Calendar
                            onChange={handleDateChange}
                            value={dateRange}
                            selectRange={true}
                            tileDisabled={isTileDisabled}
                            minDate={new Date()}
                            className="w-full border-none"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            * Klikněte na datum začátku a datum konce pro výběr rozmezí.
                        </p>
                    </div>

                    <div>
                        {showForm && dateRange ? (
                            <ReservationForm
                                from={dateRange[0]}
                                to={dateRange[1]}
                                onSuccess={() => {
                                    setShowSuccess(true);
                                    setShowForm(false);
                                    setDateRange(null);
                                    fetchReservations();
                                    // Auto-hide after 5 seconds
                                    setTimeout(() => setShowSuccess(false), 5000);
                                }}
                                onCancel={() => setShowForm(false)}
                            />
                        ) : (
                            <div className="bg-gray-50 p-6 rounded border text-center h-full flex items-center justify-center text-gray-500">
                                <p>Pro vytvoření rezervace vyberte volný termín v kalendáři vlevo.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowSuccess(false)}>
                    <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4">
                            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Úspěch!</h3>
                        <p className="text-gray-600 mb-4">Rezervace byla úspěšně odeslána.</p>
                        <p className="text-sm text-gray-500">Brzy Vás budeme kontaktovat s dalšími informacemi.</p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Zavřít
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
