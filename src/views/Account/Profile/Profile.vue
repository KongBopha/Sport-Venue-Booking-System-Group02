<template>
  <Navbar/>
  <div class="page">
    <!-- Profile Section -->
    <main class="profile-section">
        <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <h3>Navigation</h3>
         <ul class="nav-links">
          <li>
            <router-link to="/account/profile" active-class="active" exact>Profile</router-link>
          </li>
          <li>
            <router-link to="/account/booking" active-class="active">Booking</router-link>
          </li>
          <!-- <li>
            <router-link to="/history" active-class="active">History</router-link>
          </li> -->
        </ul>
        </div>
      </aside>
      <div class="profile-card">
        <!-- Title Section -->
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
    </main>

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
  </div>
  <!-- Change Password Modal -->
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



</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ProfileService from './service';

export default {
    components: {
      Navbar
  },
  data() {
    return {
      fileUrl: import.meta.env.VITE_FILE_BASE_URL,
      avatar: "https://via.placeholder.com/150", // Default profile image
      name: "", // Will be populated from localStorage
      email: "", // Will be populated from localStorage
      phone: "", // Will be populated from localStorage
      phone2: "",
      isEditing: false,
      editedUsername: "",
      editedEmail: "",
      editedPhone: "",
      editedPhone2: "",

      isChangingPassword: false,
      passwordForm: {
        current_password: '',
        new_password: '',
        confirm_password: ''
      },
      snackbar: {
        show: false,
        message: '',
        type: 'success' // 'success' | 'error'
      }
    };
  },
  created() {
    // Fetch the user object from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Map the user data to component variables
    if (user) {
      this.name = user.name || "Nay Sovannarith"; // Fallback to default if name is not available
      this.email = user.email || "narith2004@gmail.com"; // Fallback to default if email is not available
      this.phone = user.phone || "012345678"; // Fallback to default if phone is not available
      this.phone2 = user.phone2 || "";
      this.avatar = user.avatar?.startsWith('data:image') || user.avatar?.startsWith('http')
        ? user.avatar
        : this.fileUrl + user.avatar;
      // Use the avatar from localStorage or fallback to default
    }
  },
  methods: {
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
      }, 3000); // Hide after 3 seconds
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
        alert('Failed to update profile. Please try again.');
      }
    },

    // async handleImageUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = async (e) => {
    //       // Convert the image to Base64
    //       const base64Image = e.target.result;

    //       // Update the avatar in the component
    //       this.avatar = base64Image;

    //       try {
    //         // Call the updateProfile method from ProfileService to upload the image
    //         const response = await ProfileService.updateProfile({ name: this.name, email: this.email, phone: this.phone ,avatar: base64Image });
    //         const token = response.data.access_token;
    //         const user = response.data.user;

    //         // Store token, role, and user in localStorage
    //         localStorage.setItem('Token', token);
    //         localStorage.setItem('user', JSON.stringify(user)); // Store user as a JSON string
    //         // Update the component data
    //         this.avatar = this.fileUrl + user.avatar;
    //         this.name  = user.name;
    //         this.email = user.email;
    //         this.phone = user.phone;
    //       } catch (error) {
    //         console.error('Failed to update profile image:', error);
    //         alert('Failed to update profile image. Please try again.');
    //       }
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // },
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
            alert('❌ Failed to update profile image');
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

        // Reset and close modal
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
  align-items: center;
  padding: 2rem;
  background-color: #f3f4f6;
  min-height: 100vh;
}

.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Card */
.profile-card {
  width: 100%;
  max-width: 850px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Title */
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
  text-align: center;
}

/* Profile Content */
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
/* Sidebar Styling */
.sidebar {
  width: 200px;
  background-color: #f9fafb;
  border-radius: 12px 0 0 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-height: 65vh;
}

.sidebar h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.nav-links {
  list-style: none;
  padding: 0;
}

.nav-links li {
  margin-bottom: 0.75rem;
}

.nav-links li a {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links li a:hover {
  color: #10b981;
}

.nav-links li .active {
  color: #10b981;
  font-weight: bold;
  position: relative;
}

/* Optional: Add a small icon or line indicator */
.nav-links li .active::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background-color: #10b981;
  border-radius: 999px;
}
/* Responsive */
@media (max-width: 768px) {
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
}
</style>
