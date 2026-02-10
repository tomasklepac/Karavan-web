import BookingSection from '../components/BookingSection';
import Gallery from '../components/Gallery';
import Image from 'next/image';
import { Check, Info, Shield, Truck, Wind, Droplets, Zap, Coffee, Tent, Music, Wifi } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Hero Section */}
            <header className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center px-4 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50">
                    <Image
                        src="/images/outside-parkoviste-2.jpeg"
                        alt="Moderní obytný vůz Rimor EVO 69 Plus"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Váš rodinný karavan na cesty<br />
                        <span className="block mt-4 text-xl md:text-3xl font-medium opacity-90">Vyražte za dobrodružstvím s plně vybaveným vozem</span>
                    </h1>
                    <a
                        href="#rezervace"
                        className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full transition shadow-lg text-lg transform hover:scale-105"
                    >
                        Rezervovat termín
                    </a>
                </div>
            </header>

            {/* Info Section - Technical & Equippment */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Technical Specs */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <Truck className="w-8 h-8 text-blue-600" /> Technické parametry
                        </h2>
                        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Vozidlo</span>
                                <span className="font-semibold">Rimor EVO 69 Plus (2025)</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Motor</span>
                                <span className="font-semibold">2.0L, 170 koní (125 kW)</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Převodovka</span>
                                <span className="font-semibold">Manuální</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Kapacita</span>
                                <span className="font-semibold">5 na jízdu / 5 na spaní</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Řidičák</span>
                                <span className="font-semibold">Skupina B (min. 3 roky), věk 21+ let</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-4">
                                <p>Emisní norma EURO 6, dálniční známka v ceně.</p>
                            </div>
                        </div>
                    </div>

                    {/* Equipment Highlights */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-green-600" /> Výbava & Komfort
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-3 rounded-full"><Wind className="w-6 h-6 text-green-600" /></div>
                                <div>
                                    <h3 className="font-bold">Klimatizace & Topení</h3>
                                    <p className="text-sm text-gray-600">Motorová klimatizace, nezávislé topení, 3kW nástavbová klimatizace.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full"><Droplets className="w-6 h-6 text-blue-600" /></div>
                                <div>
                                    <h3 className="font-bold">Voda & Hygiena</h3>
                                    <p className="text-sm text-gray-600">Samostatná sprcha, chemické WC, ohřev vody, velká nádrž.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-yellow-100 p-3 rounded-full"><Zap className="w-6 h-6 text-yellow-600" /></div>
                                <div>
                                    <h3 className="font-bold">Energie & Nezávislost</h3>
                                    <p className="text-sm text-gray-600">Solární panel pro dobíjení baterie, možnost kempování "na divoko".</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 p-3 rounded-full"><Tent className="w-6 h-6 text-purple-600" /></div>
                                <div>
                                    <h3 className="font-bold">Extra výbava</h3>
                                    <p className="text-sm text-gray-600">Markýza 4m, nosič na 4 kola, couvací kamera, kempingový nábytek.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <Gallery />

            {/* Pricing Section */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Ceník pronájmu</h2>

                    <div className="mt-8 bg-blue-50 p-6 rounded-xl text-left max-w-4xl mx-auto border border-blue-100">
                        <h3 className="text-xl font-bold mb-4 text-blue-900">Platební a storno podmínky</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-blue-800 mb-2">Platba</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li><strong>Záloha 50 %:</strong> Splatná do 3 dnů od potvrzení rezervace.</li>
                                    <li><strong>Doplatek 50 %:</strong> Splatný nejpozději 7 dní před převzetím vozu.</li>
                                    <li><strong>Kauce:</strong> 30 000 Kč (vratná) se skládá předem na účet.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-800 mb-2">Storno podmínky</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li><strong>Více než 30 dní předem:</strong> Zdarma (vracíme 100 % zálohy).</li>
                                    <li><strong>30–7 dní předem:</strong> Vracíme 50 % uhrazené zálohy.</li>
                                    <li><strong>Méně než 7 dní předem:</strong> Záloha se nevrací (storno 100 %).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Season table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="bg-blue-600 text-white p-6 text-center">
                            <h3 className="text-xl font-bold">Ceny dle sezóny</h3>
                        </div>
                        <div className="p-6">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b text-sm text-gray-500">
                                        <th className="py-2 font-medium">Období</th>
                                        <th className="py-2 font-medium text-right">Cena / noc</th>
                                        <th className="py-2 font-medium text-right">Min. dní</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y text-gray-700">
                                    <tr>
                                        <td className="py-4">Leden – Březen</td>
                                        <td className="py-4 text-right font-bold">3 000 Kč</td>
                                        <td className="py-4 text-right">3</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4">Duben – Květen</td>
                                        <td className="py-4 text-right font-bold">3 200 Kč</td>
                                        <td className="py-4 text-right">3</td>
                                    </tr>
                                    <tr className="bg-yellow-50">
                                        <td className="py-4 font-semibold text-blue-900">Červen – Září</td>
                                        <td className="py-4 text-right font-bold text-blue-900">3 900 Kč</td>
                                        <td className="py-4 text-right">7</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4">Říjen – Prosinec</td>
                                        <td className="py-4 text-right font-bold">2 800 Kč</td>
                                        <td className="py-4 text-right">3</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-4 rounded">
                                <p><strong>Limit km:</strong> 1 500 km / týden (nadlimit 10 Kč/km).</p>
                                <p className="mt-1"><strong>Sleva:</strong> 10 % při pronájmu nad 10 dní.</p>
                                <p className="mt-1"><strong>Servisní poplatek:</strong> 1 500 Kč (jednorázově).</p>
                            </div>

                            <div className="mt-4 bg-blue-50 p-4 rounded text-blue-900">
                                <p className="text-lg font-bold mb-1">Časy předání</p>
                                <p className="text-base">
                                    <strong>Vyzvednutí:</strong> po 15:00 hod.<br />
                                    <strong>Vrácení:</strong> do 10:00 hod.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Accessories */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Coffee className="w-6 h-6 text-gray-700" /> Doplňkové příslušenství
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Skříňový přívěs 250 × 150</span>
                                <span className="font-semibold">500 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Skútr Honda PCX 125</span>
                                <span className="font-semibold">600 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Elektrokoloběžka (ks)</span>
                                <span className="font-semibold">200 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Elektrokolo (ks)</span>
                                <span className="font-semibold">400 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Elektrocentrála 3kW</span>
                                <span className="font-semibold">200 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Kempingový set (stůl + 4 židle)</span>
                                <span className="font-semibold">200 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Gril (elektrický / na dřevěné uhlí)</span>
                                <span className="font-semibold">100 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Kávovar Tchibo Cafissimo</span>
                                <span className="font-semibold">50 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Kávové kapsle</span>
                                <span className="font-semibold">10 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Koberec před obytný vůz 400 × 250</span>
                                <span className="font-semibold">100 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Nafukovací předstan 400 × 250</span>
                                <span className="font-semibold">400 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Kempingová kuchyňka</span>
                                <span className="font-semibold">100 Kč</span>
                            </li>
                            <li className="flex justify-between border-b border-dashed pb-2">
                                <span>Projektor + plátno</span>
                                <span className="font-semibold">200 Kč</span>
                            </li>
                        </ul>
                        <div className="mt-6 bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
                            <p className="font-bold mb-1">Sleva na příslušenství:</p>
                            <ul className="list-disc pl-5">
                                <li>3–10 dní: <strong>-20 %</strong></li>
                                <li>10+ dní: <strong>-30 %</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <div id="rezervace">
                <BookingSection />
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-12 border-t border-gray-800">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">O Půjčovně</h3>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Nabízíme zánovní obytný vůz Rimor EVO 69 Plus pro vaše cesty po Evropě.
                            Férové jednání, žádné skryté poplatky a plná výbava na cesty.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Kontakt</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Petr Panýrek</li>
                            <li>+420 608 177 772</li>
                            <li><a href="mailto:atripo-truhlarstvi@seznam.cz" className="hover:text-white transition">atripo-truhlarstvi@seznam.cz</a></li>
                            <li>Plzeň, Západní Čechy</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Rychlé odkazy</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Domů</a></li>
                            <li><a href="#rezervace" className="hover:text-white transition">Rezervovat</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-12 pt-8 border-t border-gray-800 text-xs opacity-50">
                    &copy; {new Date().getFullYear()} Půjčovna Karavanu. Všechna práva vyhrazena.
                </div>
            </footer>
        </main>
    );
}
