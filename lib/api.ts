const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api';

// Helper function for JSON API calls
const fetchWithErrorHandling = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Helper function for FormData API calls (no Content-Type header)
const fetchFormData = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
    });
console.log(response,'response');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Auth functions
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchWithErrorHandling(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  verify: async (token: string) => {
    return fetchWithErrorHandling(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  },
};

// Package functions
export const packageAPI = {
  getAll: async () => {
    return fetchWithErrorHandling(`${API_BASE}/packages`);
  },

  getById: async (id: string) => {
    return fetchWithErrorHandling(`${API_BASE}/packages/${id}`);
  },

  create: async (formData: FormData, token: string) => {
    return fetchFormData(`${API_BASE}/admin/packages`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData
      },
      body: formData,
    });
  },

  update: async (id: string, formData: FormData, token: string) => {
    return fetchFormData(`${API_BASE}/admin/packages/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData
      },
      body: formData,
    });
  },

  // For updates without images (using JSON)
  updateJson: async (id: string, packageData: any, token: string) => {
    return fetchWithErrorHandling(`${API_BASE}/admin/packages/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(packageData),
    });
  },

  delete: async (id: string, token: string) => {
    return fetchWithErrorHandling(`${API_BASE}/admin/packages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Itinerary functions
export const itineraryAPI = {
  getByPackage: async (packageId: string) => {
    return fetchWithErrorHandling(`${API_BASE}/packages/${packageId}/itinerary`);
  },

  create: async (itineraryData: any, token: string) => {
    return fetchWithErrorHandling(`${API_BASE}/admin/itinerary`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(itineraryData),
    });
  },

  update: async (id: string, itineraryData: any, token: string) => {
    return fetchWithErrorHandling(`${API_BASE}/admin/itinerary/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(itineraryData),
    });
  },

  delete: async (id: string, token: string) => {
    return fetchWithErrorHandling(`${API_BASE}/admin/itinerary/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Image upload functions
export const uploadAPI = {
  uploadImage: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE}/admin/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json();
  },

  deleteImage: async (publicId: string, token: string) => {
    const response = await fetch(`${API_BASE}/admin/upload/image`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ publicId }),
    });
    return response.json();
  },
};

// Similar Tours functions
export const similarToursAPI = {

    
  getByPackage: async (packageId: string,token:string) => {
    console.log('fetching similar tours for package:',packageId);
    
    return fetchWithErrorHandling(`${API_BASE}/similar-tours/${packageId}`,{
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
  },

  create: async (packageId: string, formData: FormData, token: string) => {
    console.log('test',packageId,formData,token);
    
    return fetchFormData(`${API_BASE}/similar-tours/${packageId}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
  },

  update: async (packageId: string, tourIndex: number, formData: FormData, token: string) => {
    return fetchFormData(`${API_BASE}/similar-tours/${packageId}/${tourIndex}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
  },

  delete: async (packageId: string, tourIndex: number, token: string) => {
    return fetchWithErrorHandling(`${API_BASE}/similar-tours/${packageId}/${tourIndex}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};