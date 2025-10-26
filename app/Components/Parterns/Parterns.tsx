"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const logos = [
  { src: "/indigo.png", alt: "Indigo" },
  { src: "/travel.png", alt: "Travel Aware" },
  { src: "/Airbnb.png", alt: "Airbnb" },
  { src: "/Ait.png", alt: "AITO" },
  { src: "/Vistara.png", alt: "Vistara" },
  { src: "/travel.png", alt: "Travel Aware" },
  { src: "/Airbnb.png", alt: "Airbnb" }, 
  { src: "/Ait.png", alt: "AITO" },
  { src: "/Vistara.png", alt: "Vistara" },
  { src: "/Airbnb.png", alt: "Airbnb" },
];

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    const speed = 0.5; // px per frame
    const  totalWidth = track.scrollWidth / 2; // width of one cycle

    const animate = () => {
      x -= speed;

      if (Math.abs(x) >= totalWidth) {
        x = 0; // reset after one cycle
      }

      track.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="w-full bg-white py-6 overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-12 whitespace-nowrap will-change-transform"
      >
        {/* Duplicate once for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
