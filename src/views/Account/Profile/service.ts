import axios from "axios"

export class ProfileService {
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
      console.log("Token:", Token) // Debugging
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
    } else {
      console.error("Request Error:", error.message)
    }
  }

  /**
   * Update user profile.
   * @param profileData - The updated profile data (e.g., name, email, phone, avatar).
   */
  updateProfile(profileData: { name: string; email: string; phone: string; phone2?: string; avatar?: string }) {
    return this.http
      .put("profile", profileData)
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }

  /**
   * Change user password.
   * @param passwordData - The password payload.
   */
  changePassword(payload: any) {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}profile/update-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (!res.ok) throw new Error("Password update failed")
      return res.json()
    })
  }

  /**
   * Get user bookings with statistics.
   */
  getUserBookings() {
    return this.http
      .get("user/bookings")
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }

  /**
   * Get user equipment purchases.
   */
  getUserEquipment() {
    return this.http
      .get("user/equipments")
      .then((response) => response.data)
      .catch((error) => {
        throw error
      })
  }
}

export default new ProfileService()
