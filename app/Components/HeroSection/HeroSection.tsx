'use client';

import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import SearchForm from '../SearchForm';


export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const trips = [
    { name: 'Trip To Varkala', people: 27, img: '/Varkala.png' },
    { name: 'Trip To Munnar', people: 31, img: '/Munnar.png' },
    { name: 'Trip To Wayanad', people: 20, img: '/Wayanad.png' },
    { name: 'Trip To Varkala', people: 27, img: '/Varkala.png' },
    { name: 'Trip To Munnar', people: 31, img: '/Munnar.png' },
    { name: 'Trip To Wayanad', people: 20, img: '/Wayanad.png' },
    { name: 'Trip To Varkala', people: 27, img: '/Varkala.png' },
    { name: 'Trip To Munnar', people: 31, img: '/Munnar.png' },
    { name: 'Trip To Wayanad', people: 20, img: '/Wayanad.png' },
  ];

  const mobileBgs = ['/varkalawebb.jpg', '/munnarww.jpg', '/wayanadwebb.jpg'];
  const desktopBgs = ['/varkalawebb.jpg', '/munnarww.jpg', '/wayanadwebb.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [imageLoaded, setImageLoaded] = useState(false);

  const backgrounds = isMobile ? mobileBgs : desktopBgs;

  // Preload background images to avoid flicker
  useEffect(() => {
    backgrounds.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    setImageLoaded(true);
  }, [backgrounds]);

  // Auto-slide for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setSlideDirection('right');
        setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile, backgrounds.length]);

  // Auto-slide for desktop (every 3 cards)
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setSlideDirection('right');
        setCurrentIndex((prev) => (prev + 3) % trips.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isMobile, trips.length]);

  const getDesktopBg = () => {
    const group = Math.floor(currentIndex / 3) % 3;
    return desktopBgs[group];
  };

  

  return (
    <>
      {/* Top Contact Bar */}
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

      {/* Hero Section */}
      <div className="relative w-full h-100vh lg:h-100vh">

        {/* Background transition container */}
        <div className="absolute inset-0 bg-white">
          <div
            className={`absolute inset-0 transition-transform duration-[1200ms] ease-in-out`}
            style={{
              backgroundImage: `url(${isMobile
                ? backgrounds[currentIndex % backgrounds.length]
                : getDesktopBg()
                })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: slideDirection === 'right'
                ? 'translateX(0)'
                : 'translateX(-100%)',
            }}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative top-0 left-0 w-full h-full bg-gradient-to-r to-transparent flex flex-col md:flex-row">
          {/* Desktop Nav */}
          <nav className="hidden md:flex justify-center items-center absolute top-6 right-10 space-x-20 text-lg font-semibold z-50">
            <Link href="/" className="text-white hover:text-blue-500">Home</Link>
            <Link href="/#PackageList" className="text-white hover:text-blue-500">Packages</Link>
            <Link href="/#venders" className="text-white hover:text-blue-500">Partners</Link>
            <Link href="/#testimonial" className="text-white hover:text-blue-500">Testimonial</Link>
            <Link href='/#contact'>
              <button className="border px-6 py-2 rounded-lg text-white hover:bg-white hover:text-blue-500 transition">
                Contact
              </button>
            </Link>
          </nav>

          {/* Left Text Content */}
          <div className="relative  md:p-16 w-full h-full flex flex-col justify-center space-y-5 px-3 py-6">
            <div className="relative p-6  flex flex-col justify-center space-y-5">
              <p className="text-md md:text-lg uppercase text-white">Mountains | Plains | Beaches</p>
              <div className="relative md:p-5  ">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  <span className="block mb-2">Spend your</span>
                  <span className="block mb-2">vacation</span>
                  <span className="block mb-2">with our activities</span>
                </h1>
              </div>


              {/* Trip Cards */}
              <div>
                <h2 className="font-semibold text-lg text-white mb-2">Most Popular</h2>
                <div className="flex space-x-9 overflow-x-auto md:overflow-visible">
                  {isMobile ? (
                    <div className="min-w-[160px] h-[200px] bg-white mt-5 rounded-lg shadow-md p-2">
                      <img
                        src={trips[currentIndex].img}
                        alt={trips[currentIndex].name}
                        className="rounded-md h-30 w-full object-cover"
                      />
                      <h3 className="text-sm text-black font-medium mt-2">{trips[currentIndex].name}</h3>
                      <p className="text-xs text-black mt-2">{trips[currentIndex].people} people going</p>
                    </div>
                  ) : (
                    <>
                      <div className='flex items-center justify-between overflow-hidden'>
                        <div className="w-full overflow-hidden">
                          <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                              transform: `translateX(-${(currentIndex / 3) * 100}%)`,
                              width: `${Math.ceil(trips.length / 3) * 100}%`,
                            }}
                          >
                            {Array.from({ length: Math.ceil(trips.length / 3) }).map((_, groupIndex) => (
                              <div className="flex space-x-6 min-w-full px-2" key={groupIndex}>
                                {trips.slice(groupIndex * 3, groupIndex * 3 + 3).map((trip, index) => (
                                  <div key={index} className="min-w-[160px] h-[200px] bg-white rounded-lg shadow-md p-2">
                                    <img src={trip.img} alt={trip.name} className="rounded-md h-30 w-full object-cover" />
                                    <h3 className="text-sm text-black font-medium mt-2">{trip.name}</h3>
                                    <p className="text-xs text-black mt-2">{trip.people} people going</p>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>

                        </div>


                      </div>

                    </>
                  )}
                </div>
              </div>
            </div>
            <SearchForm />
          </div>

          {/* Mobile Nav Toggle */}
          <div className="absolute top-4 right-4 md:hidden z-50">
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
        </div>
      </div>
    </>
  );
}
