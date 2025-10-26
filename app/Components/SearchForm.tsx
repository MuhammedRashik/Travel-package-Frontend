'use client';

import { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsCalendar } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';

export default function SearchForm() {
  const [location, setLocation] = useState('Select Location');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  const locationOptions = ['Munnar', 'Varkala', 'Wayanad', 'Idukki', 'Vagamon'];

  const locationRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setIsLocationOpen(false);
      }
      if (
        guestRef.current &&
        !guestRef.current.contains(e.target as Node)
      ) {
        setIsGuestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle guest count
  const incrementGuests = () => setGuests((prev) => prev + 1);
  const decrementGuests = () =>
    setGuests((prev) => (prev > 1 ? prev - 1 : 1));

  // Format date for display
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:mt-0 lg:mt-0 max-w-8xl bg-white/70 rounded-2xl py-3 md:py-6 px-3 md:px-5 shadow-md">

        {/* Desktop & Tablet View */}
        <div className="hidden md:flex justify-between items-center gap-3">
          <div className="backdrop-blur-lg bg-white/80 shadow-lg rounded-lg flex flex-col md:flex-row w-full">

            {/* Accommodation */}
            <div
              ref={locationRef}
              className="relative flex items-center border-b md:border-b-0 md:border-r px-4 py-3 w-full md:w-1/4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <div className="mr-3 text-gray-500 text-lg">🏠</div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Accommodation</span>
                <span className="font-semibold text-black text-sm">{location}</span>
              </div>
              <IoMdArrowDropdown
                className={`ml-auto text-gray-400 transform transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''
                  }`}
              />
              {isLocationOpen && (
                <ul
                  className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-[1000] py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {locationOptions.map((place) => (
                    <li
                      key={place}
                      className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setLocation(place);
                        setIsLocationOpen(false);
                      }}
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Check-in */}
            <div 
              className="relative flex items-center border-b md:border-b-0 md:border-r px-4 py-3 w-full md:w-1/4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => checkInRef.current?.showPicker()}
            >
              <BsCalendar className="mr-3 text-gray-500 text-lg" />
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Check-in</span>
                <span className="font-semibold text-black text-sm">
                  {formatDateDisplay(checkIn)}
                </span>
                <input
                  ref={checkInRef}
                  type="date"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && e.target.value > checkOut) {
                      setCheckOut('');
                    }
                  }}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Check-out */}
            <div 
              className="relative flex items-center border-b md:border-b-0 md:border-r px-4 py-3 w-full md:w-1/4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => !checkIn ? alert('Please select check-in date first') : checkOutRef.current?.showPicker()}
            >
              <BsCalendar className="mr-3 text-gray-500 text-lg" />
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Check-out</span>
                <span className={`text-sm ${checkOut ? 'font-semibold text-black' : 'text-gray-400'}`}>
                  {formatDateDisplay(checkOut)}
                </span>
                <input
                  ref={checkOutRef}
                  type="date"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  disabled={!checkIn}
                />
              </div>
            </div>

            {/* Guests */}
            <div
              ref={guestRef}
              className="relative flex items-center px-4 py-3 w-full md:w-1/4 hover:bg-gray-50 transition-colors"
            >
              <div
                className="flex items-center w-full cursor-pointer"
                onClick={() => setIsGuestOpen(!isGuestOpen)}
              >
                <FaUser className="mr-3 text-gray-500 text-lg" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Guests</span>
                  <span className="font-semibold text-black text-sm">{guests} adult{guests > 1 ? 's' : ''}</span>
                </div>
                <IoMdArrowDropdown className="ml-auto text-gray-400" />
              </div>
              {isGuestOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-[1000] p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Adults</span>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        onClick={decrementGuests}
                      >
                        <span className="text-gray-600">-</span>
                      </button>
                      <span className="w-8 text-center font-semibold">{guests}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        onClick={incrementGuests}
                      >
                        <span className="text-gray-600">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2">
            <FaSearch className="text-lg" />
            Search
          </button>
        </div>

        {/* Mobile View */}
        <div className="md:hidden w-full flex gap-3">
          <input
            type="text"
            placeholder="Search destination"
            className="px-4 py-3 w-full rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          />
          <button className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200">
            <FaSearch className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}