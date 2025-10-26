"use client";
import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

interface ItineraryDay {
  _id: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
}

interface ItineraryListProps {
  itinerary: ItineraryDay[];
}

const ItineraryList: React.FC<ItineraryListProps> = ({ itinerary }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If no itinerary data, show a message
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Itinerary</h3>
        <p className="text-gray-600">No itinerary available for this package.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 max-w-8xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-6 text-black">Package Itinerary</h3>
      {itinerary.map((day, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={day._id}
            className={`rounded-lg shadow-lg py-5 transition-all duration-300 ${
              isOpen ? "bg-[#FFA726] text-white" : "bg-white text-black"
            }`}
          >
            {/* Header Button */}
            <button
              className="flex w-full justify-between items-center px-4 py-4 focus:outline-none"
              onClick={() => toggleIndex(index)}
            >
              <span
                className={`text-left font-semibold text-sm md:text-base ${
                  isOpen ? "text-white" : "text-black"
                }`}
              >
                {day.title}
              </span>
              {isOpen ? (
                <FaChevronDown className="text-white" />
              ) : (
                <FaChevronRight className="text-black" />
              )}
            </button>

            {/* Expanded Content */}
            {isOpen && (
              <div className="px-4 pb-4 text-sm md:text-base leading-relaxed">
                {day.description}
                {day.activities && day.activities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Activities:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {day.activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItineraryList;