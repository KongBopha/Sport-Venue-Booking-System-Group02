import axios from 'axios';

export class AdminBookingService {
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

  // Get bookings with filters
  getData(filters) {
    const params = new URLSearchParams()

    if (filters.key) params.append("key", filters.key)
    if (filters.date) params.append("date", filters.date)
    if (filters.time_id) params.append("time_id", filters.time_id)
    if (filters.user_id) params.append("user_id", filters.user_id)

    try {
      return this.http.get(`admin/bookings`, { params })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Get setup data for forms
  dataSetup(date = null, pitch_id = null) {
    const params = new URLSearchParams()
    if (pitch_id) params.append("pitch_id", pitch_id)
    if (date) params.append("date", date)

    try {
      return this.http.get(`admin/bookings/data-setup`, { params })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Calculate price
  calculatePrice(params = {}) {

    try {
      return this.http.get(`admin/bookings/calculate-price`, { params })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Create booking
  create(bookingData: any) {
    return this.http.post("admin/bookings", bookingData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  }

  // Update booking
  update(id: number, bookingData: any) {
    return this.http.post(`admin/bookings/${id}`, bookingData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      console.error("Response Error:", error.response.status, error.response.data)
    } else if (error.request) {
      console.error("No Response:", error.request)
    } else {
      console.error("Request Error:", error.message)
    }
  }
}

export default new AdminBookingService();