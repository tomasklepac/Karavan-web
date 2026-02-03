'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GALLERY_IMAGES = [
    { src: '/images/outside-parkoviste-2.jpeg', alt: 'Exteriér - parkoviště' },
    { src: '/images/outside-u-vody.jpeg', alt: 'Exteriér u vody' },
    { src: '/images/outside-parkoviste.jpeg', alt: 'Exteriér - boční pohled' },
    { src: '/images/outside-u-restaurace.jpeg', alt: 'Exteriér u restaurace' },
    { src: '/images/sezeni.jpeg', alt: 'Interiér - sezení' },
    { src: '/images/kuchynka.jpeg', alt: 'Kuchyňka' },
    { src: '/images/loznice.jpeg', alt: 'Hlavní spaní' },
    { src: '/images/rozkladaci-spani.jpeg', alt: 'Rozkládací spaní' },
    { src: '/images/koupelna.jpeg', alt: 'Koupelna' },
    { src: '/images/sprcha.jpeg', alt: 'Sprcha' },
    { src: '/images/lednice.jpeg', alt: 'Lednice' },
];

export default function Gallery() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const slides = GALLERY_IMAGES.map(img => ({ src: img.src }));

    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Galerie vozu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GALLERY_IMAGES.map((image, index) => (
                        <div
                            key={index}
                            className="relative h-64 rounded-xl overflow-hidden shadow-md group cursor-pointer"
                            onClick={() => {
                                setPhotoIndex(index);
                                setLightboxOpen(true);
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={slides}
                index={photoIndex}
                on={{
                    view: ({ index }) => setPhotoIndex(index),
                }}
            />
        </section>
    );
}
