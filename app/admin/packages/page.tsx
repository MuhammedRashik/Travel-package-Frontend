'use client';
import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { packageAPI } from '@/lib/api';
import Link from 'next/link';

interface TravelPackage {
  _id: string;
  title: string;
  route: string;
  duration: number;
  price: number;
  status: string;
  createdAt: string;
}

export default function AdminPackages() {
  const { token } = useAdmin();
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await packageAPI.getAll();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (err) {
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this package?')) return;

    try {
      const data = await packageAPI.delete(id, token);
      if (data.success) {
        setPackages(packages.filter(pkg => pkg._id !== id));
      }
    } catch (err) {
      setError('Failed to delete package');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Manage Packages</h1>
              <p className="text-gray-600">Create and manage travel packages</p>
            </div>
            <Link
              href="/admin/packages/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Package
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {packages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No packages found.</p>
                <Link
                  href="/admin/packages/new"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Create your first package
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <li key={pkg._id}>
                    <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {pkg.title}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              ${pkg.price}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {pkg.route}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              {pkg.duration} days • {pkg.status}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <Link
                          href={`/admin/packages/edit/${pkg._id}`}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deletePackage(pkg._id)}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                        >
                          Delete
                        </button>
                        <Link
                          href={`/Packagedetail/${pkg._id}`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}