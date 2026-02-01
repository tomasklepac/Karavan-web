const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Reservation {
    from: string;
    to: string;
    status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELED';
}

export interface CreateReservationData {
    from: string;
    to: string;
    name: string;
    email: string;
    phone: string;
    note?: string;
}

export const api = {
    async getAvailability(): Promise<Reservation[]> {
        const res = await fetch(`${API_URL}/availability`);
        if (!res.ok) throw new Error('Failed to fetch availability');
        return res.json();
    },

    async createReservation(data: CreateReservationData): Promise<Reservation> {
        const res = await fetch(`${API_URL}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create reservation');
        }
        return res.json();
    }
};
