'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

interface PackageHeroProps {
  title: string;
  route: string;
  image?: string;
}

export default function PackageHero({ title, route, image = '/munnardetailnew.png' }: PackageHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end bg-white px-4 md:px-10 py-4 gap-5">
        <div className="flex gap-2 whitespace-nowrap">
          <img src="/uk.png" alt="log" className="h-6" />
          <h3 className="text-black font-bold">UK</h3>
        </div>
        <h3 className="hidden md:flex text-black text-md">Call us today until 17:30</h3>
        <div className="flex gap-2 whitespace-nowrap">
          <img src="/Symbol.png" alt="logo" className="h-6" />
          <a href="tel:108912356789" className="text-black font-extrabold hover:underline">
            1089 1235 6789
          </a>
        </div>
        <p className="hidden md:flex text-black">or</p>
        <button className="hidden md:flex bg-orange-300 text-white px-4 text-sm md:text-md py-2 rounded-full">
          Request a quote
        </button>
      </div>

      <div className="relative w-full h-160 md:h-100vh lg:h-100vh">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Navbar */}
        <div className='relative top-0 left-0 w-full h-full bg-gradient-to-r to-transparent flex flex-col md:flex-row'>
          <nav className="hidden md:flex justify-center items-center absolute top-6 right-10 space-x-20 text-lg font-semibold z-50">
            <Link href="/" className="text-white hover:text-blue-500">Home</Link>
            <Link href="/#PackageList" className="text-white hover:text-blue-500">Packages</Link>
            <Link href="/#venders" className="text-white hover:text-blue-500">Partners</Link>
            <Link href="/#testimonial" className="text-white hover:text-blue-500">Testimonial</Link>
            <Link href="/#contact">
              <button className="border border-white text-white px-4 py-1 md:px-6 md:py-2 rounded-lg hover:bg-white hover:text-blue-500 transition">
                Contact
              </button>
            </Link>
          </nav>

          <div className="absolute top-6 right-6 md:hidden z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Sidebar */}
          {isMenuOpen && (
            <div className="fixed top-0 right-0 w-3/4 h-full bg-white z-40 shadow-lg p-6 flex flex-col space-y-6 text-gray-800">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
              >
                <FaTimes />
              </button>
              <Link href="/" className="text-black font-semibold active:text-blue-500 hover:text-blue-500">Home</Link>
              <Link href="/#PackageList" className="text-black font-semibold active:text-blue-500 hover:text-blue-500">Packages</Link>
              <Link href="/#venders" className="text-black font-semibold active:text-blue-500 hover:text-blue-500">Partners</Link>
              <Link href="/#testimonial" className="text-black font-semibold active:text-blue-500 hover:text-blue-500">Testimonial</Link>
              <Link href='/#contact'>
                <button className="border px-4 py-2 font-semibold rounded-md">Contact</button>
              </Link>
              <button className="bg-orange-300 text-black px-4 py-2 rounded-md">Request a quote</button>
            </div>
          )}

          {/* Bottom Route Bar */}
          <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-4">
            <h2 className="font-bold text-lg md:text-xl">{title}</h2>
            <p className="text-sm md:text-base">
              {route}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}