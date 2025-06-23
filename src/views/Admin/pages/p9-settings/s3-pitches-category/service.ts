import axios from 'axios';
const BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
export class AdminPitchCategoryService {
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
    return this.http.get('admin/setting/pitches-categories')
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
  create(data) {
    return this.http.post('admin/setting/pitches-categories', data)
      .then(response => response.data)
      .catch(this.handleError);
  }

  update(id, data) {
    return this.http.post(`admin/setting/pitches-categories/${id}`, data)
      .then(response => response.data)
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(`admin/setting/pitches-categories/${id}`)
      .then(response => response.data)
      .catch(this.handleError);
  }

  setupData() {
    return this.http.get('admin/setting/pitches-categories/setup')
      .then(response => response.data)
      .catch(this.handleError);
  }

    private handleError(error) {
      if (error.response) {
        console.error('Response Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
      throw error;
    }
      async uploadBase64Image(folder, base64) {
        try {
          const res = await axios.post(`${BASE_URL}service/file/upload/base64`, {
            folder,
            image: base64
          });
          return { file: res.data.data };
        } catch (error) {
          return {
            error: error?.response?.data?.message || 'Image upload failed'
          };
        }
    }
}

export default new AdminPitchCategoryService();