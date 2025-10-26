'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { packageAPI } from '@/lib/api';

interface ThemeCardProps {
  title: string;
  description: string;
  image: string;
  _id: string;
}

export default function PackageList() {
  const [themeCards, setThemeCards] = useState<ThemeCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageAPI.getAll();
        
        if (data.success && data.data.length > 0) {
          // Transform API data to match your theme card structure
          const transformedCards = data.data.map((pkg: any) => ({
            _id: pkg._id,
            title: pkg.title,
            description: pkg.description.length > 100 
              ? pkg.description.substring(0, 100) + '...' 
              : pkg.description,
            image: pkg.heroImage || '/default-package.jpg', // Use a default image if no heroImage
          }));
          setThemeCards(transformedCards);
        } else {
          // Set empty array if no packages from API
          setThemeCards([]);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Set empty array if API fails
        setThemeCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section id="PackageList" className="py-12 px-4 md:px-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-800">
          Plan Your Kerala Journey By Theme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Show 6 skeleton loading cards */}
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse min-h-[320px] flex flex-col"
            >
              <div className="h-48 w-full bg-gray-300"></div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="PackageList" className="py-12 px-4 md:px-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-800">
        Plan Your Kerala Journey By Theme
      </h2>

      {themeCards.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Travel Plans Available</h3>
            <p className="text-gray-600 mb-6">
              We're currently preparing amazing travel experiences for you. 
              Check back soon for new packages!
            </p>
            <div className="text-sm text-gray-500">
              New packages coming soon...
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {themeCards.map((card) => (
            <Link href={`/Packagedetail/${card._id}`} key={card._id} className="group h-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = '/default-package.jpg';
                  }}
                />
                <div className="p-4 hover:bg-orange-300 active:bg-orange-300 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-600 flex-1">{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}