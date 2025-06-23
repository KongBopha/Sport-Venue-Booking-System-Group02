import axios from 'axios';

export class AdminPaymentService {
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

  // Get payments with filters and pagination
  getData(filters) {
    const params = new URLSearchParams()

    if (filters.user_id) params.append("user_id", filters.user_id)
    if (filters.status_id) params.append("status_id", filters.status_id)
    if (filters.method_id) params.append("method_id", filters.method_id)
    if (filters.page) params.append("page", filters.page)
    if (filters.limit) params.append("limit", filters.limit)

    try {
      return this.http.get(`admin/payments`, { params })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Get setup data
  dataSetup() {
    try {
      return this.http.get("admin/payments/data-setup")
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // View payment details
  view(id) {
    try {
      return this.http.get(`admin/payments/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Update payment
  update(id, paymentData) {
    try {
      return this.http.post(`admin/payments/${id}`, paymentData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Create drink payment
  createDrinkPayment(paymentId, drinkData) {
    try {
      return this.http.post(`admin/payments/${paymentId}/drink-payment`, drinkData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Update drink payment
  updateDrinkPayment(id, drinkData) {
    try {
      return this.http.post(`admin/payments/drink-payment/${id}`, drinkData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Delete drink payment
  deleteDrinkPayment(id) {
    try {
      return this.http.delete(`admin/payments/drink-payment/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    } catch (error) {
      this.handleError(error)
      throw error
    }
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

export default new AdminPaymentService()