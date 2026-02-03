import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Půjčovna Karavanu Plzeň | Rimor EVO 69 Plus | Karavan Panýrek',
    description: 'Pronájem zánovního karavanu Rimor EVO 69 Plus v Plzni. Moderní obytný vůz pro 4 osoby s plnou výbavou. Férové ceny, žádné skryté poplatky. Rezervujte online!',
    keywords: 'půjčovna karavanu, pronájem karavanu Plzeň, Rimor EVO 69, obytný vůz, karavan Plzeň, dovolená v karavanu',
    authors: [{ name: 'Petr Panýrek' }],
    openGraph: {
        title: 'Půjčovna Karavanu Plzeň | Rimor EVO 69 Plus',
        description: 'Pronájem zánovního karavanu Rimor EVO 69 Plus. Moderní obytný vůz pro 4 osoby s plnou výbavou.',
        url: 'https://karavan-panyrek.cz',
        siteName: 'Půjčovna Karavanu Panýrek',
        locale: 'cs_CZ',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    verification: {
        // Add Google Search Console verification code here when available
        // google: 'your-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="cs">
            <body>{children}</body>
        </html>
    );
}
