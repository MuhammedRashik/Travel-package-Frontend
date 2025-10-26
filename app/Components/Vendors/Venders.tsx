'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function   Vender() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const experts = [
    {
      name: 'Aleena',
      image: '/girl.jpg',
      company: 'Tripers',
    },
    {
      name: 'Reona',
      image: '/mena.png',
      company: 'Tripers',
    },
    {
      name: 'Diya',
      image: '/menb.png',
      company: 'Tripers',
    },
    {
      name: 'Arun',
      image: '/mens.jpg',
      company: 'Tripers',
    },
  ];

  return (
    <section id='venders' className="w-full bg-white">
      {/* Top Hero Section */}
      <div className="relative w-full text-white px-4 py-20 md:py-40">
        {/* Background Image Layer 1: Fire-Orange */}
        <div className="absolute w-full inset-0 z-0">
          <Image src="/bgorg.png" alt="Orange Texture" fill className="w-full object-cover md:object-fill" />
        </div>

        {/* Background Overlay Image: Hiker */}
        <div className="absolute w-full inset-0 z-0">
          <Image src="/bgimae.png" alt="Hiker Background" fill className="w-full object-cover md:object-fill opacity-20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Hidden Corners Of Kerala</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white mb-6 px-2">
            From The Misty Hilltops Of Munnar To The Serene Backwaters Of Alleppey, The Golden Beaches Of Varkala To
            The Vibrant Cultural Festivals Of Thrissur, Explore Curated Travel Experiences That Capture The Heart And
            Soul Of Kerala — One Unforgettable Journey At A Time.
          </p>
          <button className="mt-4 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white active:bg-white hover:text-orange-500 transition">
            Explore More →
          </button>
        </div>

        {/* Floating Images */}
        <div className="absolute left-6 md:left-10 top-20 rotate-[-6deg] z-30">
          <div className="hidden md:flex lg:flex relative w-32 h-32 md:w-44 md:h-44 border-[6px] border-white rounded-xl overflow-hidden shadow-xl">
            <Image src="/ret.png" alt="Elephant Ride" fill className="object-cover" />
          </div>
        </div>

        <div className="absolute left-6 md:left-10 top-85 rotate-[15deg] z-30">
          <div className="hidden md:flex lg:flex relative w-32 h-32 md:w-44 md:h-44 border-[6px] border-white rounded-xl overflow-hidden shadow-xl">
            <Image src="/elesafari.png" alt="Elephant Ride" fill className="object-cover" />
          </div>
        </div>

        <div className="absolute right-9 md:right-8 bottom-14 md:bottom-32 z-30">
          <div className="hidden md:flex lg:flex relative w-24 h-34 md:w-52 md:h-80 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
            <Image src="/rect.png" alt="Hiking" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Expert Section */}
      <div className="w-full mx-auto py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Content */}
        <div className="md:w-[70%] px-5">
          <h2 className="text-3xl md:text-5xl text-black font-bold mb-4 ">Meet The Expert Behind Your Kerala Journey</h2>
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            Get Personalized Assistance From A Dedicated Kerala Travel Expert Who’s Here To Help You Plan Your Dream Trip,
            Suggest Hidden Gems, And Make Every Step Smooth And Stress-Free.
          </p>
          <button className="px-6 py-4 bg-blue-600 text-white rounded-md font-medium active:bg-blue-700 hover:bg-blue-700 transition">
            Connect
          </button>
        </div>

        {/* Right Scrollable Cards */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap pb-2 flex gap-6 cursor-grab active:cursor-grabbing scrollbar-hide px-4"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {experts.map((expert, index) => (
            <div
              key={index}
              className="inline-block w-80 flex-shrink-0 bg-white shadow-md rounded-xl text-center"
            >
              <div className="relative w-full h-90">
                <Image src={expert.image} alt={expert.name} fill className="object-cover rounded-t-xl" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">{expert.name}</h3>
                <p className="text-sm text-gray-600">{expert.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
