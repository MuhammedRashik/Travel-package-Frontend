'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { packageAPI, uploadAPI } from '@/lib/api';
import Link from 'next/link';

export default function CreatePackagePage() {
  const router = useRouter();
  const { token } = useAdmin();
  
  const [title, setTitle] = useState('');
  const [route, setRoute] = useState('');
  const [duration, setDuration] = useState(1);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [included, setIncluded] = useState<string[]>([]);
  const [includedInput, setIncludedInput] = useState('');
  const [brochureUrl, setBrochureUrl] = useState('');
  const [status, setStatus] = useState('active');
  
  // Image states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
     const formData = new FormData();
  formData.append('title', title);
  formData.append('route', route);
  formData.append('duration', duration.toString());
  formData.append('description', description);
  formData.append('price', price.toString());
  // formData.append('included', JSON.stringify(included)); // Remove this temporarily
  formData.append('status', status);
  formData.append('brochureUrl', brochureUrl);
  
  if (imageFile) {
    formData.append('image', imageFile);
  }

      const data = await packageAPI.create(formData, token);
      
      if (data.success) {
        setSuccess('Package created successfully!');
        setTimeout(() => {
          router.push('/admin/packages');
        }, 2000);
      } else {
        setError(data.message || 'Failed to create package');
      }
    } catch (err) {
      console.error('Error creating package:', err);
      setError('Failed to create package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Package</h1>
              <p className="text-gray-600">Add a new travel package to your collection</p>
            </div>
            <Link
              href="/admin/packages"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Back to Packages
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
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

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
            {/* Image Upload Section */}
            <div>
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
                        alt="Preview"
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
                </div>
              </div>
            </div>

            {/* Rest of the form remains the same as your edit page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the package in detail..."
              />
            </div>

            {/* Included Items */}
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
              <div className="space-y-2">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <span className='text-black'>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeIncludedItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Brochure URL */}
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

            {/* Status */}
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

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Package...' : 'Create Package'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}