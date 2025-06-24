import axios from "axios"

export class UserBookingService {
  private apiUrl: string = import.meta.env.VITE_API_BASE_URL

  private http = axios.create({
    baseURL: this.apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  constructor() {
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.http.interceptors.request.use((config) => {
      const Token = localStorage.getItem("Token")
      if (Token) {
        config.headers.Authorization = `Bearer ${Token}`
      }
      return config
    })

    // Response interceptor for global error handling
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleError(error)
        return Promise.reject(error)
      },
    )
  }

  private handleError(error: any) {
    if (error.response) {
      console.error("Response Error:", error.response.status, error.response.data)

      switch (error.response.status) {
        case 401:
          localStorage.removeItem("Token")
          window.location.href = "/auth/login"
          break
        case 403:
          console.error("Access forbidden")
          break
        case 404:
          console.error("Resource not found")
          break
        case 422:
          console.error("Validation error:", error.response.data)
          break
        case 500:
          console.error("Server error")
          break
        default:
          console.error("Unknown error occurred")
      }
    } else if (error.request) {
      console.error("No Response:", error.request)
      console.error("Network error or server is down")
    } else {
      console.error("Request Error:", error.message)
    }
  }

  // Get initial data setup
  dataSetup(pitch_id?: number, date?: string) {
    const params: any = {}
    if (pitch_id) params.pitch_id = pitch_id
    if (date) params.date = date

    return axios
      .get(this.apiUrl + "public/bookings/data-setup", { params })
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }

  // Calculate price for booking
  calculatePrice(date: string, time_id: number, pitch_id: number) {
    const params = {
      date,
      time_id,
      pitch_id,
    }

    return this.http
      .get("user/bookings/calculate-price", { params })
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }

  // Create new booking
  create(body: any) {
    return this.http
      .post("user/bookings", body)
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }

  // Get sports with categories and pitches
  getSportsWithDetails() {
    return this.http
      .get("public/sports/details")
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }

  // Get categories by sport
  getCategoriesBySport(sportId: number) {
    return this.http
      .get(`public/sports/${sportId}/categories`)
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }

  // Get pitches by category
  getPitchesByCategory(categoryId: number) {
    return this.http
      .get(`public/categories/${categoryId}/pitches`)
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }
}

export default new UserBookingService()
