"use client";
import React from "react";

interface PackageDetailsProps {
  title: string;
  description: string;
  included: string[];
  brochureUrl?: string;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ 
  title, 
  description, 
  included, 
  brochureUrl = "#" 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 p-6 md:py-10 bg-white">
      {/* Left Section */}
      <div className="flex-1 space-y-4">
        <h2 className="text-xl md:text-3xl font-bold text-black">
          {title}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
        <button className="bg-[#FFA726] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-orange-600 transition">
          View Brochure
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-[#FFA726] text-white rounded-lg p-6 space-y-4">
        <h3 className="text-lg md:text-xl font-bold">What's Included</h3>
        <ul className="space-y-2 text-sm md:text-base">
          {included.map((item, index) => (
            <li key={index} className="list-disc list-inside">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageDetails;