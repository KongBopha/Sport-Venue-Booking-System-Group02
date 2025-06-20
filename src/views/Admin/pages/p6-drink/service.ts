import axios from 'axios';

export class AdminDrinkService {
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
  addDrink(data) {
  return this.http.post('admin/drinks', data)
}

  listing() {
    return this.http.get('admin/drinks')
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

  updateDrink(id, data) {
    return this.http.post(`admin/drinks/${id}`, data)
      .then(res => res.data)
      .catch(err => {
        console.error('Error updating drink:', err);
        throw err;
      });
  }

  deleteDrink(id) {
    return this.http.delete(`admin/drinks/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error deleting drink:', err);
        throw err;
      });
  }
}

export default new AdminDrinkService();
