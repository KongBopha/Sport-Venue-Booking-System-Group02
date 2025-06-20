import axios from 'axios';

export class AdminUserService {
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
      if (Token) {
        config.headers.Authorization = `Bearer ${Token}`;
      }
      return config;
    });

    // Response interceptor for global error handling
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response Error:', error.response.status, error.response.data);
      
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          localStorage.removeItem('Token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 422:
          console.error('Validation error:', error.response.data);
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('Unknown error occurred');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No Response:', error.request);
      console.error('Network error or server is down');
    } else {
      // Something happened in setting up the request
      console.error('Request Error:', error.message);
    }
  }

  // Get users with filtering and pagination
  listing(params = {}) {
    return this.http.get('admin/users', { params })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Get all user roles
  dataSetup() {
    return this.http.get('admin/users/data-setup')
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Create new user
  create(userData: any) {
    return this.http.post('admin/users', userData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Update existing user
  update(id: number, userData: any) {
    return this.http.post(`admin/users/${id}`, userData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Delete user
  delete(id: number) {
    return this.http.delete(`admin/users/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  
}

export default new AdminUserService();