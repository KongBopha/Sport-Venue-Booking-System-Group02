import axios from 'axios';

export class AdminBlackListService {
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
  }

  listing() {
    return this.http.get('admin/setting/blacklist')
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
  update(id: number, payload: { reason: string }) {
    return this.http
      .put(`admin/setting/blacklist/${id}`, payload)
      .then(res => res.data)
  }
  delete(id: number) {
    return this.http
      .delete(`admin/setting/blacklist/${id}`)
      .then(res => res.data)
      .catch(error => {
        console.error('Failed to delete blacklist entry:', error);
        throw error;
      });
  }
  // ✅ NEW: Fetch user list for dropdown
  setup() {
    return this.http
      .get('admin/setting/blacklist/setup')
      .then((res) => res.data)
      .catch((error) => {
        console.error('Failed to fetch setup data:', error)
        throw error
      })
  }

  // ✅ NEW: Create a blacklist entry
  create(payload: { user_id: number; reason: string }) {
    return this.http
      .post('admin/setting/blacklist', payload)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Failed to create blacklist entry:', error)
        throw error
      })
  }


}

export default new AdminBlackListService();