<template>
  <Navbar/>
  <div class="page mt-20">
    <main class="profile-section">
      <div class="profile-card">
        <!-- Navigation Tabs -->
        <div class="nav-tabs">
          <button 
            :class="['tab-btn', { active: activeTab === 'profile' }]"
            @click="activeTab = 'profile'"
          >
            <i class="fas fa-user"></i> Profile
          </button>
          <button 
            :class="['tab-btn', { active: activeTab === 'bookings' }]"
            @click="switchToBookings"
          >
            <i class="fas fa-calendar-alt"></i> My Bookings
          </button>
          <button 
            :class="['tab-btn', { active: activeTab === 'equipment' }]"
            @click="switchToEquipment"
          >
            <i class="fas fa-tools"></i> Equipment
          </button>
        </div>

        <!-- Profile Tab Content -->
        <div v-if="activeTab === 'profile'" class="tab-content">
          <div class="title">Profile Page</div>
          <div class="profile-content">
            <!-- Left Section (Image) -->
            <div class="profile-left">
              <img :src="avatar" alt="Profile Picture" class="profile-image" />
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                ref="fileInput"
                style="display: none;"
              />
              <button class="upload-image-btn" @click="$refs.fileInput.click()">
                <i class="fas fa-camera"></i> Upload Image
              </button>
            </div>

            <!-- Right Section (Information) -->
            <div class="profile-right">
              <div class="info">
                <div class="info-title">Name:</div>
                <div class="info-item">
                  <i class="fas fa-user"></i>
                  <span>{{ name }}</span>
                </div>
                <div class="info-title">Email:</div>
                <div class="info-item">
                  <i class="fas fa-envelope"></i>
                  <span>{{ email }}</span>
                </div>
                <div class="info-title">Phone:</div>
                <div class="info-item">
                  <i class="fas fa-phone"></i>
                  <span>{{ phone }}</span>
                </div>
                <div v-if="phone2">
                  <div class="info-title">Phone 2:</div>
                  <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <span>{{ phone2 }}</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <button class="update-btn" @click="openEditModal">Edit Profile</button>
                  <button class="update-btn" @click="isChangingPassword = true">Change Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bookings Tab Content -->
        <div v-if="activeTab === 'bookings'" class="tab-content">
          <div class="title">My Bookings</div>
          
          <!-- Booking Statistics -->
          <div class="stats-grid" v-if="bookingStats">
            <div class="stat-card">
              <div class="stat-number">{{ bookingStats.total_bookings }}</div>
              <div class="stat-label">Total Bookings</div>
            </div>
            <div class="stat-card pending">
              <div class="stat-number">{{ bookingStats.total_pending_bookings }}</div>
              <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card confirmed">
              <div class="stat-number">{{ bookingStats.total_confirmed_bookings }}</div>
              <div class="stat-label">Confirmed</div>
            </div>
            <div class="stat-card completed">
              <div class="stat-number">{{ bookingStats.total_completed_bookings }}</div>
              <div class="stat-label">Completed</div>
            </div>
            <div class="stat-card cancelled">
              <div class="stat-number">{{ bookingStats.total_cancelled_bookings }}</div>
              <div class="stat-label">Cancelled</div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loadingBookings" class="loading-state">
            <div class="spinner"></div>
            <p>Loading bookings...</p>
          </div>

          <!-- Bookings List -->
          <div v-else-if="bookings.length > 0" class="bookings-list">
            <div 
              v-for="booking in bookings" 
              :key="booking.id" 
              class="booking-card"
              @click="viewBookingDetails(booking)"
            >
              <div class="booking-header">
                <div class="booking-sport">
                  <i class="fas fa-futbol"></i>
                  {{ booking.pitch?.category?.sport?.name }}
                </div>
                <div class="booking-status" :style="{ backgroundColor: booking.booking_status?.color }">
                  {{ booking.booking_status?.icon }} {{ booking.booking_status?.name }}
                </div>
              </div>
              
              <div class="booking-details">
                <div class="booking-venue">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ booking.pitch?.name }} - {{ booking.pitch?.category?.name }}
                </div>
                <div class="booking-time">
                  <i class="fas fa-clock"></i>
                  {{ formatTime(booking.time?.name) }}
                </div>
                <div class="booking-date">
                  <i class="fas fa-calendar"></i>
                  {{ formatDate(booking.created_at) }}
                </div>
              </div>

              <div class="booking-payment">
                <div class="payment-amount">${{ booking.payment?.total_price }}</div>
                <div 
                  class="payment-status" 
                  :style="{ color: booking.payment?.payment_status?.color }"
                >
                  {{ booking.payment?.payment_status?.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- No Bookings -->
          <div v-else class="no-data">
            <i class="fas fa-calendar-times"></i>
            <p>No bookings found</p>
          </div>
        </div>

        <!-- Equipment Tab Content -->
        <div v-if="activeTab === 'equipment'" class="tab-content">
          <div class="title">Equipment Purchases</div>
          
          <!-- Loading State -->
          <div v-if="loadingEquipment" class="loading-state">
            <div class="spinner"></div>
            <p>Loading equipment...</p>
          </div>

          <!-- Equipment List -->
          <div v-else-if="equipment.length > 0" class="equipment-list">
            <div 
              v-for="item in equipment" 
              :key="item.id" 
              class="equipment-card"
            >
              <div class="equipment-header">
                <div class="equipment-receipt">
                  <i class="fas fa-receipt"></i>
                  Receipt: {{ item.receipt_number }}
                </div>
                <div 
                  class="equipment-status" 
                  :style="{ backgroundColor: item.payment_status?.color }"
                >
                  {{ item.payment_status?.name }}
                </div>
              </div>
              
              <div class="equipment-details">
                <div class="equipment-method">
                  <i class="fas fa-credit-card"></i>
                  Payment Method: {{ item.payment_method?.name }}
                </div>
                <div class="equipment-date">
                  <i class="fas fa-calendar"></i>
                  {{ formatDate(item.updated_at) }}
                </div>
              </div>

              <div class="equipment-amount">
                <div class="amount-label">Total Amount</div>
                <div class="amount-value">${{ item.total_price }}</div>
              </div>
            </div>
          </div>

          <!-- No Equipment -->
          <div v-else class="no-data">
            <i class="fas fa-tools"></i>
            <p>No equipment purchases found</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Booking Details Modal -->
    <div v-if="showBookingModal" class="modal booking-modal">
      <div class="modal-content booking-modal-content">
        <div class="modal-header">
          <h2>Booking Details</h2>
          <button @click="showBookingModal = false" class="close-btn">
            <XIcon class="w-4 h-4" />
          </button>
        </div>
        
        <div class="booking-modal-body" v-if="selectedBooking">
          <!-- Booking Info -->
          <div class="detail-section">
            <h3>Booking Information</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <label>Sport:</label>
                <span>{{ selectedBooking.pitch?.category?.sport?.name }}</span>
              </div>
              <div class="detail-item">
                <label>Venue:</label>
                <span>{{ selectedBooking.pitch?.name }}</span>
              </div>
              <div class="detail-item">
                <label>Category:</label>
                <span>{{ selectedBooking.pitch?.category?.name }}</span>
              </div>
              <div class="detail-item">
                <label>Time:</label>
                <span>{{ formatTime(selectedBooking.time?.name) }}</span>
              </div>
              <div class="detail-item">
                <label>Phone:</label>
                <span>{{ selectedBooking.phone }}</span>
              </div>
              <div class="detail-item" v-if="selectedBooking.phone2">
                <label>Phone 2:</label>
                <span>{{ selectedBooking.phone2 }}</span>
              </div>
              <div class="detail-item">
                <label>Status:</label>
                <span 
                  class="status-badge" 
                  :style="{ backgroundColor: selectedBooking.booking_status?.color }"
                >
                  {{ selectedBooking.booking_status?.icon }} {{ selectedBooking.booking_status?.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Payment Info -->
          <div class="detail-section" v-if="selectedBooking.payment">
            <h3>Payment Information</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <label>Receipt Number:</label>
                <span>{{ selectedBooking.payment.receipt_number }}</span>
              </div>
              <div class="detail-item">
                <label>Total Price:</label>
                <span class="price">${{ selectedBooking.payment.total_price }}</span>
              </div>
              <div class="detail-item">
                <label>Payment Status:</label>
                <span 
                  class="status-badge" 
                  :style="{ color: selectedBooking.payment.payment_status?.color }"
                >
                  {{ selectedBooking.payment.payment_status?.name }}
                </span>
              </div>
              <div class="detail-item" v-if="selectedBooking.payment.payment_method">
                <label>Payment Method:</label>
                <span>{{ selectedBooking.payment.payment_method?.name }}</span>
              </div>
              <div class="detail-item">
                <label>Payment Date:</label>
                <span>{{ formatDate(selectedBooking.payment.updated_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Drinks -->
          <div class="detail-section" v-if="selectedBooking.drinks_payments && selectedBooking.drinks_payments.length > 0">
            <h3>Drinks & Refreshments</h3>
            <div class="drinks-list">
              <div 
                v-for="drinkPayment in selectedBooking.drinks_payments" 
                :key="drinkPayment.id"
                class="drink-item"
              >
                <div class="drink-info">
                  <img 
                    v-if="drinkPayment.drink?.image" 
                    :src="fileUrl + drinkPayment.drink.image" 
                    :alt="drinkPayment.drink?.name"
                    class="drink-image"
                  />
                  <div class="drink-details">
                    <div class="drink-name">{{ drinkPayment.drink?.name }}</div>
                    <div class="drink-price">Unit Price: ${{ drinkPayment.drink?.price }}</div>
                  </div>
                </div>
                <div class="drink-quantity">
                  <span>Qty: {{ drinkPayment.qty }}</span>
                  <span class="drink-total">Total: ${{ drinkPayment.total_price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <div class="form-group">
          <label for="edit-name">Username:</label>
          <input id="edit-name" v-model="editedUsername" type="text" />
        </div>
        <div class="form-group">
          <label for="edit-email">Email:</label>
          <input id="edit-email" v-model="editedEmail" type="email" />
        </div>
        <div class="form-group">
          <label for="edit-phone">Phone:</label>
          <input id="edit-phone" v-model="editedPhone" type="tel" />
        </div>
        <div class="form-group">
          <label for="edit-phone2">Phone 2:</label>
          <input id="edit-phone2" v-model="editedPhone2" type="tel" />
        </div>

        <div class="modal-buttons">
          <button @click="saveProfile" class="save-btn">Save</button>
          <button @click="closeEditModal" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="isChangingPassword" class="modal">
      <div class="modal-content">
        <h2>Change Password</h2>
        <div class="form-group">
          <label for="new-password">New Password:</label>
          <input id="new-password" type="password" v-model="passwordForm.password" />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input id="confirm-password" type="password" v-model="passwordForm.confirm_password" />
        </div>
        <div class="modal-buttons">
          <button class="save-btn" @click="changePassword">Save</button>
          <button class="cancel-btn" @click="isChangingPassword = false">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Snackbar -->
    <transition name="fade-slide">
      <div
        v-if="snackbar.show"
        :class="[
          'fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-4 text-sm font-medium text-white shadow-xl transition-all duration-300 ease-in-out z-[9999]',
          snackbar.type === 'success' ? 'bg-green-500' : 'bg-red-500',
          'rounded-2xl'
        ]"
      >
        {{ snackbar.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ProfileService from './service';
import {
  XIcon
} from "lucide-vue-next";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      fileUrl: import.meta.env.VITE_FILE_BASE_URL,
      activeTab: 'profile',
      
      // Profile data
      avatar: "https://via.placeholder.com/150",
      name: "",
      email: "",
      phone: "",
      phone2: "",
      isEditing: false,
      editedUsername: "",
      editedEmail: "",
      editedPhone: "",
      editedPhone2: "",

      // Password change
      isChangingPassword: false,
      passwordForm: {
        current_password: '',
        new_password: '',
        confirm_password: ''
      },

      // Bookings data
      bookings: [],
      bookingStats: null,
      loadingBookings: false,
      showBookingModal: false,
      selectedBooking: null,

      // Equipment data
      equipment: [],
      loadingEquipment: false,

      // Snackbar
      snackbar: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.name = user.name || "Nay Sovannarith";
        this.email = user.email || "narith2004@gmail.com";
        this.phone = user.phone || "012345678";
        this.phone2 = user.phone2 || "";
        this.avatar = user.avatar?.startsWith('data:image') || user.avatar?.startsWith('http')
          ? user.avatar
          : this.fileUrl + user.avatar;
      }
    },

    async switchToBookings() {
      this.activeTab = 'bookings';
      if (this.bookings.length === 0) {
        await this.loadBookings();
      }
    },

    async switchToEquipment() {
      this.activeTab = 'equipment';
      if (this.equipment.length === 0) {
        await this.loadEquipment();
      }
    },

    async loadBookings() {
      try {
        this.loadingBookings = true;
        const response = await ProfileService.getUserBookings();
        this.bookings = response.data.bookings || [];
        this.bookingStats = {
          total_bookings: response.data.total_bookings,
          total_pending_bookings: response.data.total_pending_bookings,
          total_confirmed_bookings: response.data.total_confirmed_bookings,
          total_completed_bookings: response.data.total_completed_bookings,
          total_cancelled_bookings: response.data.total_cancelled_bookings
        };
      } catch (error) {
        console.error('Failed to load bookings:', error);
        this.showSnackbar('❌ Failed to load bookings', 'error');
      } finally {
        this.loadingBookings = false;
      }
    },

    async loadEquipment() {
      try {
        this.loadingEquipment = true;
        const response = await ProfileService.getUserEquipment();
        this.equipment = response.data.equiments || [];
      } catch (error) {
        console.error('Failed to load equipment:', error);
        this.showSnackbar('❌ Failed to load equipment', 'error');
      } finally {
        this.loadingEquipment = false;
      }
    },

    viewBookingDetails(booking) {
      this.selectedBooking = booking;
      this.showBookingModal = true;
    },

    formatTime(timeString) {
      if (!timeString) return '';
      const [hour] = timeString.split(':');
      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
      return `${displayHour}:00 ${ampm}`;
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    },

    openEditModal() {
      this.isEditing = true;
      this.editedUsername = this.name;
      this.editedEmail = this.email;
      this.editedPhone = this.phone;
      this.editedPhone2 = this.phone2;
      this.editedAvatar = this.avatar;
    },

    closeEditModal() {
      this.isEditing = false;
    },

    showSnackbar(message, type = 'success') {
      this.snackbar.message = message;
      this.snackbar.type = type;
      this.snackbar.show = true;
      setTimeout(() => {
        this.snackbar.show = false;
      }, 3000);
    },

    async saveProfile() {
      try {
        const updatedProfile = {
          name: this.editedUsername,
          email: this.editedEmail,
          phone: this.editedPhone,
          phone2: this.editedPhone2,
          avatar: this.editedAvatar?.startsWith('data:image') ? this.editedAvatar : undefined
        };

        const response = await ProfileService.updateProfile(updatedProfile);
        const token = response.data.access_token;
        const user = response.data.user;

        localStorage.setItem('Token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.avatar = user.avatar.startsWith('data:image') || user.avatar.startsWith('http')
          ? user.avatar
          : this.fileUrl + user.avatar;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.phone2 = user.phone2; 
        this.showSnackbar('✅ Profile updated successfully!', 'success');
        this.closeEditModal();

      } catch (error) {
        console.error('Failed to update profile:', error);
        this.showSnackbar('❌ Failed to update profile', 'error');
      }
    },

    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Image = e.target.result;
          this.avatar = base64Image;
          this.editedAvatar = base64Image;

          try {
            const updatedProfile = {
              name: this.name,
              email: this.email,
              phone: this.phone,
              avatar: base64Image
            };

            const response = await ProfileService.updateProfile(updatedProfile);
            const token = response.data.access_token;
            const user = response.data.user;

            localStorage.setItem('Token', token);
            localStorage.setItem('user', JSON.stringify(user));

            this.name = user.name;
            this.email = user.email;
            this.phone = user.phone;
            this.avatar = user.avatar.startsWith('data:image') || user.avatar.startsWith('http')
              ? user.avatar
              : this.fileUrl + user.avatar;
            this.showSnackbar('✅ Profile image updated successfully!', 'success');
          } catch (error) {
            console.error('Image upload failed:', error);
            this.showSnackbar('❌ Failed to update profile image', 'error');
          }
        };
        reader.readAsDataURL(file);
      }
    },

    async changePassword() {
      try {
        if (!this.passwordForm.password || !this.passwordForm.confirm_password) {
          this.showSnackbar('❌ Please fill out both password fields.', 'error');
          return;
        }

        if (this.passwordForm.password !== this.passwordForm.confirm_password) {
          this.showSnackbar('❌ Passwords do not match.', 'error');
          return;
        }

        await ProfileService.changePassword(this.passwordForm);

        this.showSnackbar('✅ Password updated successfully!', 'success');

        this.isChangingPassword = false;
        this.passwordForm = {
          password: '',
          confirm_password: ''
        };
      } catch (error) {
        console.error(error);
        this.showSnackbar('❌ Failed to update password. Please try again.', 'error');
      }
    }
  },
};
</script>

<style scoped>
/* Layout */
.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  background-color: #f3f4f6;
  min-height: 100vh;
}

.profile-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

/* Card */
.profile-card {
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

/* Navigation Tabs */
.nav-tabs {
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}

.tab-btn {
  flex: 1;
  padding: 1rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.tab-btn.active {
  background-color: #3b82f6;
  color: white;
  border-bottom: 3px solid #1d4ed8;
}

/* Tab Content */
.tab-content {
  padding: 2rem;
}

/* Title */
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
  text-align: center;
}

/* Profile Content (existing styles) */
.profile-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.profile-left {
  flex: 1;
  text-align: center;
}

.profile-image {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 9999px;
  border: 3px solid #e5e7eb;
  margin-bottom: 1rem;
}

.upload-image-btn {
  background-color: #4b5563;
  color: white;
  padding: 0.6rem 1.25rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.upload-image-btn:hover {
  background-color: #374151;
}

.profile-right {
  flex: 2;
}

/* Info Display */
.info-title {
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  color: #111827;
}

.info-item {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #374151;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.info-item i {
  color: #9ca3af;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-card.pending {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-card.confirmed {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card.completed {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-card.cancelled {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Bookings List */
.bookings-list {
  display: grid;
  gap: 1rem;
}

.booking-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.booking-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.booking-sport {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.booking-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.booking-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.booking-venue,
.booking-time,
.booking-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.booking-payment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.payment-amount {
  font-size: 1.2rem;
  font-weight: bold;
  color: #059669;
}

.payment-status {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Equipment List */
.equipment-list {
  display: grid;
  gap: 1rem;
}

.equipment-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.equipment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.equipment-receipt {
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.equipment-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.equipment-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.equipment-method,
.equipment-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.equipment-amount {
  text-align: right;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.amount-label {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.amount-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #059669;
}

/* No Data State */
.no-data {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.no-data i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Booking Modal */
.booking-modal .modal-content {
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.booking-modal-content {
  width: 90%;
  max-width: 800px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.booking-modal-body {
  max-height: 60vh;
  overflow-y: auto;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.detail-item label {
  font-weight: 500;
  color: #6b7280;
}

.detail-item span {
  font-weight: 500;
  color: #1f2937;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #059669;
}

/* Drinks List */
.drinks-list {
  display: grid;
  gap: 1rem;
}

.drink-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.drink-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.drink-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}

.drink-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.drink-name {
  font-weight: 500;
  color: #1f2937;
}

.drink-price {
  font-size: 0.9rem;
  color: #6b7280;
}

.drink-quantity {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.drink-total {
  font-weight: bold;
  color: #059669;
}

/* Buttons */
.update-btn {
  background-color: #6b7280;
  color: white;
  padding: 0.6rem 1.5rem;
  margin-top: 0.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.update-btn:hover {
  background-color: #4b5563;
}

/* Modal */
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

/* Modal Buttons */
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.save-btn, .cancel-btn {
  flex: 1;
  padding: 0.6rem 0;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  color: white;
  margin: 0 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #10b981;
}

.save-btn:hover {
  background-color: #059669;
}

.cancel-btn {
  background-color: #ef4444;
}

.cancel-btn:hover {
  background-color: #dc2626;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-tabs {
    flex-direction: column;
  }
  
  .tab-btn {
    padding: 0.75rem 1rem;
  }
  
  .profile-content {
    flex-direction: column;
    align-items: center;
  }

  .profile-right {
    padding-left: 0;
  }

  .profile-image {
    width: 180px;
    height: 180px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .booking-details {
    grid-template-columns: 1fr;
  }
  
  .equipment-details {
    grid-template-columns: 1fr;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-modal-content {
    width: 95%;
    margin: 1rem;
  }
}

/* Fade slide animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
