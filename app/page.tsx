"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "./Components/HeroSection/HeroSection";
import PackageList from "./Components/Package/PackageList";
import Venders from "./Components/Vendors/Venders";
import TestimonialSlider from "./Components/TestimonialSlider/TestimonialSlider";
import Footer from "./Components/Footer/Footer";
import ContactSection from "./Components/ContactForm/ContactSection";

// Lottie Player
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (you can replace this with actual data fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <DotLottiePlayer
          src="/loading.lottie" // Place your .lottie file in public folder
          autoplay
          loop
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <PackageList />
      <Venders />
      <TestimonialSlider />
      <ContactSection />
      <Footer />
    </div>
  );
};



export default Page;
