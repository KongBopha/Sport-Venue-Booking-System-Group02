import axios from 'axios';

export class AdminTimeTypeService {
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
    return this.http.get('admin/setting/time-types')
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
    create(payload) {
    return this.http.post('admin/setting/time-types', payload)
      .then(res => res.data)
  }

  delete(id) {
    return this.http.delete(`admin/setting/time-types/${id}`)
  }
  update(id, data) {
    return this.http.put(`/admin/setting/time-types/${id}`, data);
  }
}

export default new AdminTimeTypeService();