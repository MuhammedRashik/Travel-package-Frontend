"use client";
import React from "react";

const Newsletter = () => {
  return (
    <div
      className="relative w-full  py-16 px-6 md:px-12"
      style={{ backgroundImage: "url('/bgmunnar.png')" }}
    >
      {/* Overlay only if needed
      <div className="absolute inset-0 bg-orange-600/70"></div> 
      */}

      <div className="relative max-w-5xl mx-auto text-center text-white">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Get Travel Inspiration Straight To Your Inbox
        </h2>
        <p className="text-sm md:text-base font-medium mb-8">
          Be The First To Know About Exclusive Deals, Destination Guides, And
          Travel Tips For Your Next Getaway.
        </p>

        {/* Form */}
        <form className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="First name"
            className="w-full md:w-1/4 px-4 py-2 rounded-md bg-white text-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full md:w-1/4 px-4 py-2 rounded-md bg-white text-black focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full md:w-1/3 px-4 py-2 rounded-md bg-white text-black focus:outline-none"
          />
          <button
            type="submit"
            className="w-full md:w-auto bg-[#002F6A] hover:bg-[#041a35] text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
