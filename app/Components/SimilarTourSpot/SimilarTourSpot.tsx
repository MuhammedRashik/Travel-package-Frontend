"use client";
import Image from "next/image";

interface TourSpot {
  title: string;
  description: string;
  image: string;
}

interface SimilarTourSpotProps {
  similarTours: TourSpot[];
}

export default function SimilarTourSpot({ similarTours }: SimilarTourSpotProps) {
  // If no similar tours, show professional empty state
  if (!similarTours || similarTours.length === 0) {
    return (
      <section className="py-12 px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-2xl text-black font-bold mb-4">Similar Tour Spots</h2>
          <div className="bg-gray-50 rounded-lg py-8 px-6 max-w-2xl mx-auto">
            <p className="text-gray-600 mb-2">No similar tours currently available</p>
            <p className="text-gray-500 text-sm">
              We're working on adding more tour options. Please check back later for updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8">
      <h2 className="text-center text-2xl text-black font-bold mb-8">
        Similar Tour Spots
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {similarTours.map((spot, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
          >
            <img
              src={spot.image}
              alt={spot.title}
              className="h-48 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-package.jpg';
              }}
            />
            <div className="p-4 hover:bg-orange-300 active:bg-orange-300 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{spot.title}</h3>
              <p className="text-sm text-gray-600 flex-1">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}