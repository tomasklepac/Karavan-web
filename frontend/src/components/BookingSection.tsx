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

        // Disable booked dates
        return reservations.some(res =>
            isWithinInterval(date, {
                start: parseISO(res.from),
                end: new Date(parseISO(res.to).getTime() - 1) // '[)' interval logic
            })
        );
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
                                    alert('Rezervace byla úspěšně vytvořena! Čekejte na potvrzení.');
                                    setShowForm(false);
                                    setDateRange(null);
                                    fetchReservations();
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
        </section>
    );
}
