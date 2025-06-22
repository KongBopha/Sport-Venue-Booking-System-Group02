import axios from 'axios';

export class AdminSportService {
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
    return this.http.get('admin/setting/sports')
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
   delete(id: number) {
    return this.http.delete(`/admin/setting/sports/${id}`).then((res) => res.data);
  }
  update(id, data) {
    return this.http.put(`/admin/setting/sports/${id}`, data)
      .then(res => res.data)
      .catch(error => {
        console.error('Update Error:', error.response?.data || error.message);
        throw error;
      });
  }
  create(data) {
      return this.http.post('/admin/setting/sports', data)
        .then(res => res.data)
        .catch(error => {
          console.error('Create Error:', error.response?.data || error.message);
          throw error;
        });
    }


  
}

export default new AdminSportService();