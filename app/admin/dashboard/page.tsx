'use client';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { admin, logout } = useAdmin();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Unauthorized</p>
          <Link href="/admin/login" className="text-blue-600 hover:underline">
            Go to Login
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {admin.username}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{admin.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📦</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Packages
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Management Cards */}
            <Link href="/admin/packages" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">🏔️</span>
                      </div>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">
                        Manage Packages
                      </h3>
                      <p className="text-sm text-gray-500">
                        Add, edit, or delete travel packages
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">📊</span>
                    </div>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">
                      Analytics
                    </h3>
                    <p className="text-sm text-gray-500">
                      View package performance
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Recent Activity */}
          {/* <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Activity
              </h3>
              <div className="mt-4 text-sm text-gray-500">
                <p>No recent activity to display.</p>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}