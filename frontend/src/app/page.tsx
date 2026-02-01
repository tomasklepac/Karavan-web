import BookingSection from '../components/BookingSection';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Hero Section */}
            <header className="bg-blue-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Půjčovna Karavanu</h1>
                <p className="text-xl md:text-2xl opacity-90 mb-8">
                    Zažijte svobodu na cestách s naším komfortním karavanem.
                </p>
                <a
                    href="#rezervace"
                    className="inline-block bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full transition"
                >
                    Rezervovat termín
                </a>
            </header>

            {/* Info Section */}
            <section className="py-16 px-4 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">O karavanu</h2>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Komfort</h3>
                        <p>Plně vybavená kuchyňka, pohodlné spaní pro 4 osoby, vlastní sprcha a toaleta.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Nezávislost</h3>
                        <p>Solární panely a velká nádrž na vodu vám umožní kempovat i mimo kempy.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Výbava</h3>
                        <p>V ceně je i nosič na kola, kempingový nábytek a základní nádobí.</p>
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <BookingSection />

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 text-center mt-12">
                <p>&copy; {new Date().getFullYear()} Půjčovna Karavanu. Všechna práva vyhrazena.</p>
                <p className="text-sm opacity-60 mt-2">vytvořeno jako MVP demo</p>
            </footer>
        </main>
    );
}
