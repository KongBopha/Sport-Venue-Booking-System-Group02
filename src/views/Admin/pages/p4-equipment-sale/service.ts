import axios from 'axios';

export class AdminEquimentSaleService {
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
    return this.http.get('admin/equipment-sales')
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
    return this.http
      .delete(`admin/equipment-sales/${id}`)
      .then(res => res.data)
      .catch(error => {
        console.error('Failed to delete blacklist entry:', error);
        throw error;
      });
  }
    setup() {
    return this.http
      .get('admin/equipment-sales/setup')
      .then((res) => res.data)
      .catch((error) => {
        console.error('Failed to fetch setup data:', error)
        throw error
      })
  }
  create(payload) {
  return this.http.post('admin/equipment-sales', payload)
    .then(res => res.data)
}
update(id, payload) {
  return this.http.put(`admin/equipment-sales/${id}`, payload)
    .then(res => res.data)
}


}

export default new AdminEquimentSaleService();