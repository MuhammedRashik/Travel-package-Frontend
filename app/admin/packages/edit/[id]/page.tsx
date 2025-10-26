'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { packageAPI, itineraryAPI, similarToursAPI } from '@/lib/api';
import Link from 'next/link';

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
  status: string;
  similarTours: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

interface ItineraryDay {
  _id?: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
}

export default function EditPackagePage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAdmin();
  const id = params.id as string;

  const [packageData, setPackageData] = useState<TravelPackage | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Package form states
  const [title, setTitle] = useState('');
  const [route, setRoute] = useState('');
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [included, setIncluded] = useState<string[]>([]);
  const [includedInput, setIncludedInput] = useState('');
  const [brochureUrl, setBrochureUrl] = useState('');
  const [status, setStatus] = useState('active');

  // Image states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentHeroImage, setCurrentHeroImage] = useState('');

  // Itinerary form states
  const [editingItinerary, setEditingItinerary] = useState<ItineraryDay | null>(null);
  const [itineraryDayNumber, setItineraryDayNumber] = useState(1);
  const [itineraryTitle, setItineraryTitle] = useState('');
  const [itineraryDescription, setItineraryDescription] = useState('');
  const [itineraryActivities, setItineraryActivities] = useState<string[]>([]);
  const [itineraryActivityInput, setItineraryActivityInput] = useState('');

  // Similar Tours states
  const [similarTours, setSimilarTours] = useState<any[]>([]);
  const [editingSimilarTour, setEditingSimilarTour] = useState<any | null>(null);
  const [similarTourTitle, setSimilarTourTitle] = useState('');
  const [similarTourDescription, setSimilarTourDescription] = useState('');
  const [similarTourImageFile, setSimilarTourImageFile] = useState<File | null>(null);
  const [similarTourImagePreview, setSimilarTourImagePreview] = useState('');
  const [similarTourIndex, setSimilarTourIndex] = useState<number | null>(null);
  const [savingSimilarTour, setSavingSimilarTour] = useState(false); // Add loading state for similar tour

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true);
        const data = await packageAPI.getById(id);
        
        if (data.success) {
          const pkg = data.data.package;
          setPackageData(pkg);
          setItinerary(data.data.itinerary || []);
          
          // Set package form values
          setTitle(pkg.title);
          setRoute(pkg.route);
          setDuration(pkg.duration);
          setDescription(pkg.description);
          setPrice(pkg.price);
          setIncluded(pkg.included || []);
          setCurrentHeroImage(pkg.heroImage || '');
          setBrochureUrl(pkg.brochureUrl || '');
          setStatus(pkg.status || 'active');
        } else {
          setError('Package not found');
        }
      } catch (err) {
        console.error('Error fetching package:', err);
        setError('Failed to load package data');
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchPackageData();
    }
  }, [id, token]);

  // Package functions
  const addIncludedItem = () => {
    if (includedInput.trim() && !included.includes(includedInput.trim())) {
      setIncluded([...included, includedInput.trim()]);
      setIncludedInput('');
    }
  };

  const removeIncludedItem = (index: number) => {
    setIncluded(included.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('route', route);
      formData.append('duration', duration.toString());
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('included', JSON.stringify(included));
      formData.append('brochureUrl', brochureUrl);
      formData.append('status', status);

      // If new image is selected, append it
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (currentHeroImage) {
        // If no new image but existing image exists, keep the current one
        formData.append('heroImage', currentHeroImage);
      }

      const data = await packageAPI.update(id, formData, token);
      
      if (data.success) {
        setSuccess('Package updated successfully!');
        // Refresh package data to get updated image URL
        const packageData = await packageAPI.getById(id);
        if (packageData.success) {
          setCurrentHeroImage(packageData.data.package.heroImage || '');
        }
        // Reset image selection
        setImageFile(null);
        setImagePreview('');
      } else {
        setError(data.message || 'Failed to update package');
      }
    } catch (err) {
      console.error('Error updating package:', err);
      setError('Failed to update package');
    } finally {
      setSaving(false);
    }
  };

  const deletePackage = async () => {
    if (!token || !confirm('Are you sure you want to delete this package? This action cannot be undone.')) return;

    try {
      const data = await packageAPI.delete(id, token);
      if (data.success) {
        router.push('/admin/packages');
      } else {
        setError('Failed to delete package');
      }
    } catch (err) {
      console.error('Error deleting package:', err);
      setError('Failed to delete package');
    }
  };

  // Itinerary functions
  const addActivity = () => {
    if (itineraryActivityInput.trim() && !itineraryActivities.includes(itineraryActivityInput.trim())) {
      setItineraryActivities([...itineraryActivities, itineraryActivityInput.trim()]);
      setItineraryActivityInput('');
    }
  };

  const removeActivity = (index: number) => {
    setItineraryActivities(itineraryActivities.filter((_, i) => i !== index));
  };

  const resetItineraryForm = () => {
    setEditingItinerary(null);
    setItineraryDayNumber(1);
    setItineraryTitle('');
    setItineraryDescription('');
    setItineraryActivities([]);
    setItineraryActivityInput('');
  };

  const editItineraryDay = (day: ItineraryDay) => {
    setEditingItinerary(day);
    setItineraryDayNumber(day.dayNumber);
    setItineraryTitle(day.title);
    setItineraryDescription(day.description);
    setItineraryActivities(day.activities || []);
  };

  const saveItineraryDay = async () => {
    if (!token) return;

    try {
      const itineraryData = {
        packageId: id,
        dayNumber: itineraryDayNumber,
        title: itineraryTitle,
        description: itineraryDescription,
        activities: itineraryActivities
      };

      let data;
      if (editingItinerary && editingItinerary._id) {
        // Update existing itinerary
        data = await itineraryAPI.update(editingItinerary._id, itineraryData, token);
      } else {
        // Create new itinerary
        data = await itineraryAPI.create(itineraryData, token);
      }

      if (data.success) {
        // Refresh itinerary data
        const packageData = await packageAPI.getById(id);
        if (packageData.success) {
          setItinerary(packageData.data.itinerary || []);
        }
        resetItineraryForm();
        setSuccess('Itinerary day saved successfully!');
      } else {
        setError(data.message || 'Failed to save itinerary day');
      }
    } catch (err) {
      console.error('Error saving itinerary:', err);
      setError('Failed to save itinerary day');
    }
  };

  // Similar Tours functions
  const resetSimilarTourForm = () => {
    setEditingSimilarTour(null);
    setSimilarTourTitle('');
    setSimilarTourDescription('');
    setSimilarTourImageFile(null);
    setSimilarTourImagePreview('');
    setSimilarTourIndex(null);
  };

  const editSimilarTour = (tour: any, index: number) => {
    setEditingSimilarTour(tour);
    setSimilarTourTitle(tour.title);
    setSimilarTourDescription(tour.description);
    setSimilarTourImagePreview('');
    setSimilarTourIndex(index);
  };

  const handleSaveSimilarTour = async () => {
    console.log('first');
    
    if (!token) return;

    // Validate required fields
    if (!similarTourTitle.trim() || !similarTourDescription.trim()) {
      setError('Title and description are required');
      return;
    }

    setSavingSimilarTour(true); // Start loading
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', similarTourTitle);
      formData.append('description', similarTourDescription);
      
      if (similarTourImageFile) {
        formData.append('image', similarTourImageFile);
      }

      // Better debugging - show actual FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.log('second');
      
      let data;
      if (editingSimilarTour && similarTourIndex !== null) {
        // Update existing similar tour
        console.log('Updating similar tour...');
        data = await similarToursAPI.update(id, similarTourIndex, formData, token);
      } else {
        // Create new similar tour
        console.log('third');
        data = await similarToursAPI.create(id, formData, token);
        console.log('API Response:', data, 'fourth');
      }

      if (data.success) {
        // Refresh similar tours data
        const similarToursData = await similarToursAPI.getByPackage(id, token);
        if (similarToursData.success) {
          setSimilarTours(similarToursData.data);
        }
        resetSimilarTourForm();
        setSuccess('Similar tour saved successfully!');
      } else {
        setError(data.message || 'Failed to save similar tour');
      }
    } catch (err) {
      console.error('Error saving similar tour:', err);
      setError('Failed to save similar tour');
    } finally {
      setSavingSimilarTour(false); // End loading
    }
  };

  const deleteSimilarTour = async (index: number) => {
    if (!token || !confirm('Are you sure you want to delete this similar tour?')) return;

    try {
      const data = await similarToursAPI.delete(id, index, token);
      if (data.success) {
        // Refresh similar tours data
        const similarToursData = await similarToursAPI.getByPackage(id, token);
        if (similarToursData.success) {
          setSimilarTours(similarToursData.data);
        }
        setSuccess('Similar tour deleted successfully!');
      } else {
        setError('Failed to delete similar tour');
      }
    } catch (err) {
      console.error('Error deleting similar tour:', err);
      setError('Failed to delete similar tour');
    }
  };

  // Load similar tours when component mounts
  useEffect(() => {
    const loadSimilarTours = async () => {
      console.log('id and token',id,token);
      
      if (id && token) {
        console.log('entered');
        
        try {
          const data = await similarToursAPI.getByPackage(id, token);
          console.log(data,'similar tours data');
          
          if (data.success) {
            setSimilarTours(data.data);
          }
        } catch (err) {
          console.error('Error loading similar tours:', err);
        }
      }
    };
    
    loadSimilarTours();
  }, [id, token]);

  const deleteItineraryDay = async (itineraryId: string) => {
    if (!token || !confirm('Are you sure you want to delete this itinerary day?')) return;

    try {
      const data = await itineraryAPI.delete(itineraryId, token);
      if (data.success) {
        // Refresh itinerary data
        const packageData = await packageAPI.getById(id);
        if (packageData.success) {
          setItinerary(packageData.data.itinerary || []);
        }
        setSuccess('Itinerary day deleted successfully!');
      } else {
        setError('Failed to delete itinerary day');
      }
    } catch (err) {
      console.error('Error deleting itinerary:', err);
      setError('Failed to delete itinerary day');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package data...</p>
        </div>
      </div>
    );
  }

  if (error && !packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/admin/packages"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Package</h1>
              <p className="text-gray-600">Update package details and itinerary</p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin/packages"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Back to Packages
              </Link>
              <button
                onClick={deletePackage}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Package Details Form */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Package Details</h2>
                
                {/* Image Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Image
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            className="h-32 w-32 object-cover rounded-lg border"
                            src={imagePreview}
                            alt="New preview"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : currentHeroImage ? (
                        <div className="relative">
                          <img
                            className="h-32 w-32 object-cover rounded-lg border"
                            src={currentHeroImage}
                            alt="Current package"
                          />
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            Current
                          </div>
                        </div>
                      ) : (
                        <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG, WEBP up to 5MB</p>
                      {currentHeroImage && !imagePreview && (
                        <p className="text-xs text-gray-500 mt-1">
                          Select a new image to replace the current one
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePackageSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 13-Day Luxury Kerala Itinerary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Route *
                      </label>
                      <input
                        type="text"
                        required
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Kochi – Munnar – Thekkady – Kumarakom"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (days) *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={duration}
                          onChange={(e) => setDuration(parseInt(e.target.value))}
                          className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (USD) *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value))}
                          className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe the package in detail..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What's Included
                      </label>
                      <div className="flex space-x-2 mb-3">
                        <input
                          type="text"
                          value={includedInput}
                          onChange={(e) => setIncludedInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncludedItem())}
                          className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Add an included item..."
                        />
                        <button
                          type="button"
                          onClick={addIncludedItem}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {included.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                            <span className='text-black text-sm'>{item}</span>
                            <button
                              type="button"
                              onClick={() => removeIncludedItem(index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brochure URL
                      </label>
                      <input
                        value={brochureUrl}
                        onChange={(e) => setBrochureUrl(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="/brochures/package.pdf"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        'Update Package'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Itinerary Management */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {editingItinerary ? 'Edit Itinerary Day' : 'Add Itinerary Day'}
                </h2>
                
                {/* ... Rest of itinerary section remains exactly the same ... */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day Number *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={itineraryDayNumber}
                      onChange={(e) => setItineraryDayNumber(parseInt(e.target.value))}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={itineraryTitle}
                      onChange={(e) => setItineraryTitle(e.target.value)}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Day 1 – Arrive Kochi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={itineraryDescription}
                      onChange={(e) => setItineraryDescription(e.target.value)}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the day's activities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activities
                    </label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={itineraryActivityInput}
                        onChange={(e) => setItineraryActivityInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                        className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add an activity..."
                      />
                      <button
                        type="button"
                        onClick={addActivity}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {itineraryActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded">
                          <span className='text-black text-sm'>{activity}</span>
                          <button
                            type="button"
                            onClick={() => removeActivity(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={saveItineraryDay}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      {editingItinerary ? 'Update Day' : 'Add Day'}
                    </button>
                    {editingItinerary && (
                      <button
                        onClick={resetItineraryForm}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Existing Itinerary */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Existing Itinerary</h3>
                  {itinerary.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No itinerary added yet.</p>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {itinerary
                        .sort((a, b) => a.dayNumber - b.dayNumber)
                        .map((day) => (
                        <div key={day._id} className="bg-gray-50 p-3 rounded border">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-medium text-black">{day.title}</span>
                              <span className="text-sm text-gray-500 ml-2">(Day {day.dayNumber})</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => editItineraryDay(day)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteItineraryDay(day._id!)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{day.description}</p>
                          {day.activities && day.activities.length > 0 && (
                            <div className="text-xs text-gray-500">
                              <strong>Activities:</strong> {day.activities.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Similar Tours Management */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {editingSimilarTour ? 'Edit Similar Tour' : 'Add Similar Tour'}
                </h2>
                
                <div className="space-y-4 mb-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tour Image {!editingSimilarTour && '*'}
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="shrink-0">
                        {similarTourImagePreview ? (
                          <div className="relative">
                            <img
                              className="h-24 w-24 object-cover rounded-lg border"
                              src={similarTourImagePreview}
                              alt="Preview"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSimilarTourImageFile(null);
                                setSimilarTourImagePreview('');
                              }}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : editingSimilarTour?.image ? (
                          <div className="relative">
                            <img
                              className="h-24 w-24 object-cover rounded-lg border"
                              src={editingSimilarTour.image}
                              alt="Current tour"
                            />
                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
                              Current
                            </div>
                          </div>
                        ) : (
                          <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (!file.type.startsWith('image/')) {
                                setError('Please select an image file');
                                return;
                              }
                              if (file.size > 5 * 1024 * 1024) {
                                setError('Image size should be less than 5MB');
                                return;
                              }
                              setSimilarTourImageFile(file);
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                setSimilarTourImagePreview(e.target?.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG, WEBP up to 5MB</p>
                        {editingSimilarTour?.image && !similarTourImagePreview && (
                          <p className="text-xs text-gray-500 mt-1">
                            Select a new image to replace the current one
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tour Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={similarTourTitle}
                      onChange={(e) => setSimilarTourTitle(e.target.value)}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Wayanad Hills Adventure"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={similarTourDescription}
                      onChange={(e) => setSimilarTourDescription(e.target.value)}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe this similar tour..."
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveSimilarTour}
                      disabled={(similarTours.length >= 3 && !editingSimilarTour) || savingSimilarTour}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {savingSimilarTour ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {editingSimilarTour ? 'Updating...' : 'Adding...'}
                        </>
                      ) : (
                        editingSimilarTour ? 'Update Tour' : 'Add Tour'
                      )}
                    </button>
                    {editingSimilarTour && (
                      <button
                        onClick={resetSimilarTourForm}
                        disabled={savingSimilarTour}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  
                  {similarTours.length >= 3 && !editingSimilarTour && (
                    <p className="text-sm text-orange-600">
                      Maximum 3 similar tours allowed. Delete one to add a new tour.
                    </p>
                  )}
                </div>

                {/* Existing Similar Tours */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Similar Tours ({similarTours.length}/3)
                  </h3>
                  {similarTours.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No similar tours added yet.</p>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {similarTours.map((tour, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded border">
                          <div className="flex items-start space-x-4">
                            <img
                              src={tour.image}
                              alt={tour.title}
                              className="h-16 w-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium text-black">{tour.title}</h4>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => editSimilarTour(tour, index)}
                                    disabled={savingSimilarTour}
                                    className="text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteSimilarTour(index)}
                                    disabled={savingSimilarTour}
                                    className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">{tour.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}