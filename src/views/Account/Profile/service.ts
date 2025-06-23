import axios from 'axios';

export class ProfileService {
  private apiUrl: string = import.meta.env.VITE_API_BASE_URL;

  private http = axios.create({
    baseURL: this.apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.http.interceptors.request.use((config) => {
      const Token = localStorage.getItem('Token');
      console.log('Token:', Token); // Debugging
      if (Token) {
        config.headers.Authorization = `Bearer ${Token}`;
      }
      return config;
    });
  }

  /**
   * Update user profile.
   * @param profileData - The updated profile data (e.g., name, email, phone, avatar).
   */
  updateProfile(profileData: { name: string; email: string; phone: string; avatar?: string }) {
    return this.http.put('profile', profileData)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Response Error:', error.response.status, error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No Response:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Request Error:', error.message);
        }
        throw error;
      });
  }
  /**
 * Change user password.
 * @param passwordData - The password payload.
 */
    changePassword(payload) {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}profile/update-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      },
      body: JSON.stringify(payload)
    }).then(res => {
      if (!res.ok) throw new Error('Password update failed');
      return res.json();
    });
  }
  getData(filters: Record<string, any> = {}, { includeUser = true } = {}) {
    const params = new URLSearchParams();

    // Only add user_id if includeUser is true
    if (includeUser) {
      const storedUser = localStorage.getItem('user');
      let currentUser = null;

      if (storedUser) {
        try {
          currentUser = JSON.parse(storedUser);
        } catch (e) {
          console.error('Failed to parse user from localStorage', e);
        }
      }

      if (currentUser && currentUser.id) {
        filters.user_id = currentUser.id;
      }
    }

    // Append all valid filters
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });

    return this.http.get(`user/bookings`, { params })
      .then(response => response.data)
      .catch(error => {
        console.error('Request failed:', error);
        throw error;
      });
  }
  listingEquipment(filters: Record<string, any> = {}) {
  const params = new URLSearchParams();

  // ====== START: Add user_id from localStorage ======
  const storedUser = localStorage.getItem('user');
  let currentUser = null;

  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }

  if (currentUser && currentUser.id) {
    filters.user_id = currentUser.id;
  }
  // ====== END: Add user_id ======

  // Append all valid filters to query params
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null) {
      params.append(key, filters[key]);
    }
  });

  return this.http.get(`admin/equipment-sales`, { params })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        console.error('Response Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
      throw error;
    });
}
}

export default new ProfileService();