"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PackageDetails from "../../Components/Packagedetails/Packagedetails";
import ItineraryList from "../../Components/ItineraryList/ItineraryList";
import SimilarTourSpot from "../../Components/SimilarTourSpot/SimilarTourSpot";
import NewsletterSection from "../../Components/NewsLetterSection/NewsLetterSection";
import Partners from "../../Components/Parterns/Parterns";
import Footer from "../../Components/Footer/Footer";
import PackageHero from "../../Components/PackageHero/PackageHero";
import { packageAPI } from "@/lib/api";

// Define types for our data
interface TravelPackage {
  _id: string;
  title: string;
  route: string;
  duration: number;
  description: string;
  price: number;
  included: string[];
  heroImage: string;
  brochureUrl: string;
  similarTours?: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

interface ItineraryDay {
  _id: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
}

interface PackageData {
  package: TravelPackage;
  itinerary: ItineraryDay[];
}

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const data = await packageAPI.getById(id);
        
        if (data.success) {
          setPackageData(data.data);
        } else {
          setError("Package not found");
        }
      } catch (err) {
        console.error("Error fetching package:", err);
        setError("Failed to load package details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackageData();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || "The package you are looking for does not exist or may have been removed."}
          </p>
          <a 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const { package: travelPackage, itinerary } = packageData;

  return (
    <div>
      <PackageHero 
        title={travelPackage.title}
        route={travelPackage.route}
        image={travelPackage.heroImage || "/munnardetailnew.png"}
      />
      <PackageDetails 
        title={travelPackage.title}
        description={travelPackage.description}
        included={travelPackage.included}
        brochureUrl={travelPackage.brochureUrl}
      />
      <ItineraryList itinerary={itinerary} />
      <SimilarTourSpot similarTours={travelPackage.similarTours || []} />
      <NewsletterSection />
      <Partners />
      <Footer />
    </div>
  );
};

export default Page;