'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Aleena',
    image: '/ree1.png',
    rating: 4,
    feedback:
      'Everything was perfectly planned — from Munnar to the backwaters.',
  },
  {
    name: 'Reona',
    image: '/ree2.png',
    rating: 5,
    feedback:
      'Everything was perfectly planned — from Munnar to the backwaters.',
  },
  {
    name: 'Diya',
    image: '/re3.jpg',
    rating: 4,
    feedback:
      'Kerala was magical and the planning made it effortless.',
  },
  {
    name: 'Vidhya',
    image: '/re4.jpg',
    rating: 5,
    feedback:
      'Amazing service! It felt like a custom journey tailored just for me.',
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const visibleCards = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(testimonials.length / visibleCards);

  const handleNext = () => {
    if (index < totalSlides - 1) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section
      id='testimonial'
      className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row items-center justify-center bg-cover bg-center  py-20 px-4"
      style={{ backgroundImage: "url('/hills.png')" }}
    >
      {/* Blue Section */}
      <div className="relative z-10 w-full md:w-full  max-w-[750px] bg-[#003b72] rounded-l-3xl rounded-r-[80px] flex flex-col justify-center px-6 md:px-10 md:py-15 shadow-xl">
        {/* Quote Icon */}
        <div className="absolute -top-14 left-6 md:left-10 bg-blue-500 w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl shadow-lg border-8 border-white">
          <FaQuoteLeft />
        </div>

        <div className="mt-16 md:mt-20 w-full md:w-3/4 px-5 py-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Hear from Happy Explorers
          </h2>
          <p className="text-sm md:text-base text-white text-opacity-80 mb-6 leading-relaxed">
            From first-time visitors to seasoned explorers, hear how travelers
            experienced the beauty of Kerala through carefully crafted trips and expert local guidance.
          </p>
          <button className="text-base font-semibold underline flex items-center gap-2 hover:text-blue-300 transition text-white">
            Read more <span className="text-lg">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative z-20 w-full  md:w-[50%] mt-10 md:mt-0  md:ml-[-250px]">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full md:w-[50%] px-1 md:px-3  py-3  flex-shrink-0">
                <div className="bg-white text-black rounded-t-3xl rounded-b-[2.5rem] overflow-hidden relative  h-[400px] md:h-[470px]">
                  <div className="relative w-full h-58 md:h-72 rounded-t-3xl overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover rounded-t-3xl"
                    />
                  </div>
                  <div className="p-6 md:p-10 pb-6 md:pb-10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg md:text-xl">{t.name}</h3>
                      <div className="flex items-center gap-2 md:gap-3 text-yellow-500 text-base md:text-lg">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <span key={starIdx}>
                            {starIdx < t.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {t.feedback}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5 mt-8 justify-center">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition text-xl"
            disabled={index === 0}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition text-xl"
            disabled={index >= totalSlides - 1}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Pagination */}
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border-2 border-white ${
                i === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
