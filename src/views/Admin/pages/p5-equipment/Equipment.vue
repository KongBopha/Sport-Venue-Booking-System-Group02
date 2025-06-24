<template>
  <div class="space-y-8">
    <!-- Equipment Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Equipment</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ equipment.length }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
          >
            <Package class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <!-- <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Available</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">287</p>
          </div>
          <div
            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
          >
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Rented Out</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">43</p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"
          >
            <Clock class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Maintenance</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div
            class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"
          >
            <AlertTriangle class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div> -->
    </div>

    <!-- Equipment Management -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Search and Actions -->
      <div
        class="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
      >
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Search
              class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search equipment..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button
            @click="showFilterInput = !showFilterInput"
            class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter class="w-5 h-5 text-gray-500" />
            <!-- Filter -->
          </button>
          <div
            v-if="showFilterInput"
            class="px-6 py-4 bg-gray-50 border-t border-gray-200"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Filter by Name -->
              <div>
                <label class="block text-sm text-gray-700 mb-1"
                  >Filter by Name</label
                >
                <input
                  v-model="filterText"
                  type="text"
                  placeholder="Enter equipment name"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <!-- Min Price -->
              <div>
                <label class="block text-sm text-gray-700 mb-1"
                  >Min Price</label
                >
                <input
                  v-model.number="minPrice"
                  type="number"
                  min="0"
                  placeholder="0.00"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <!-- Max Price -->
              <div>
                <label class="block text-sm text-gray-700 mb-1"
                  >Max Price</label
                >
                <input
                  v-model.number="maxPrice"
                  type="number"
                  min="0"
                  placeholder="999.99"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <!-- <button
            class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <MoreVertical class="w-5 h-5 text-gray-500" />
          </button> -->
        </div>
        <button
          @click="openAddDialog"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus class="w-4 h-4" />
          <span>Add Equipment</span>
        </button>
      </div>

      <!-- Add/Edit Dialog -->
      <div
        v-if="showAddDialog"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-xl font-semibold mb-4">
            {{ isEditMode ? "Edit Equipment" : "Add Equipment" }}
          </h2>
          <form @submit.prevent="confirmAddEdit">
            <!-- Image Upload -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div v-if="imagePreview" class="mt-2">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-32 h-32 object-cover rounded border"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Name</label>
              <input
                v-model="selectedEquipment.name"
                required
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Category</label>
              <select
                v-model="selectedEquipment.categoryId"
                required
                class="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">Select a category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Price</label>
              <input
                v-model.number="selectedEquipment.price"
                required
                type="number"
                min="0"
                step="0.01"
                class="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="closeAddDialog"
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Dialog -->
      <div
        v-if="showDeleteDialog"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-xl font-semibold mb-4">Confirm Delete</h2>
          <p>
            Are you sure you want to delete
            <strong>{{ selectedEquipment.name }}</strong
            >?
          </p>
          <div class="flex justify-end space-x-2 mt-6">
            <button
              @click="closeDeleteDialog"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Equipment Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date Added
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in equipment"
              :key="item.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
                  >
                    <img
                      v-if="item.image"
                      :src="fileUrl + item.image"
                      class="w-full h-full object-cover"
                    />
                    <Package v-else class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ item.name }}
                    </div>
                    <div class="text-sm text-gray-500">ID: {{ item.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getCategoryName(item.sport_id) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.updated_at }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ item.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button
                    class="p-1 hover:bg-gray-100 rounded"
                    title="Edit"
                    @click="openEditDialog(item)"
                  >
                    <Edit class="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    @click="openDeleteDialog(item)"
                    class="p-1 hover:bg-gray-100 rounded"
                    title="Delete"
                  >
                    <Trash2 class="w-4 h-4 text-red-600" />
                  </button>
                  <!-- <button class="p-1 hover:bg-gray-100 rounded" title="More">
                    <MoreVertical class="w-4 h-4" />
                  </button> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
      >
        <div class="flex items-center space-x-2">
          <select
            v-model="itemsPerPage"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span class="text-sm text-gray-600"
            >1 - {{ Math.min(itemsPerPage, filteredEquipment.length) }} of
            {{ filteredEquipment.length }}</span
          >
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            <ChevronsLeft class="w-4 h-4" />
          </button>
          <button
            class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button
            class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
          <button
            class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ChevronsRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import {
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-vue-next";
import AdminEquimentService from "./service";
export default {
  name: "Equipment",
  data() {
    return {
      // Equipment data
      // equipment: ref([
      //   {
      //     id: 1,
      //     name: "Soccer Ball",
      //     category: "Football",
      //     updated_at: "12-12-2023",
      //     price: 25,
      //   },
      //   {
      //     id: 2,
      //     name: "Table Tennis Paddle",
      //     category: "Table Tennis",
      //     updated_at: "15-12-2023",
      //     price: 35,
      //   },
      //   {
      //     id: 3,
      //     name: "Basketball",
      //     category: "Basketball",
      //     updated_at: "18-12-2023",
      //     price: 30,
      //   },
      //   {
      //     id: 4,
      //     name: "Tennis Racket",
      //     category: "Tennis",
      //     updated_at: "20-12-2023",
      //     price: 85,
      //   },
      //   {
      //     id: 5,
      //     name: "Volleyball",
      //     category: "Volleyball",
      //     updated_at: "22-12-2023",
      //     price: 28,
      //   },
      //   {
      //     id: 6,
      //     name: "Badminton Set",
      //     category: "Badminton",
      //     updated_at: "25-12-2023",
      //     price: 65,
      //   },
      //   {
      //     id: 7,
      //     name: "Cricket Bat",
      //     category: "Cricket",
      //     updated_at: "28-12-2023",
      //     price: 95,
      //   },
      //   {
      //     id: 8,
      //     name: "Hockey Stick",
      //     category: "Hockey",
      //     updated_at: "30-12-2023",
      //     price: 75,
      //   },
      //   {
      //     id: 9,
      //     name: "Golf Club",
      //     category: "Golf",
      //     updated_at: "02-01-2024",
      //     price: 150,
      //   },
      //   {
      //     id: 10,
      //     name: "Swimming Goggles",
      //     category: "Swimming",
      //     updated_at: "05-01-2024",
      //     price: 20,
      //   },
      // ]),

      fileUrl: import.meta.env.VITE_FILE_BASE_URL,

      equipment: [],

      categories: [
        { id: 1, name: "Football" },
        { id: 2, name: "Volleyball" },
        { id: 3, name: "Table Tennis" },
      ],

      showAddDialog: false,
      isEditMode: false,
      showDeleteDialog: false,
      showFilterInput: false,
      filterText: "",
      minPrice: null,
      maxPrice: null,
      selectedImage: null,
      imagePreview: null,
      loading: false,

      selectedEquipment: {
        id: null,
        name: "",
        price: 0,
        sport_id: "",
        updated_at: "",
        image: null,
      },

      // Search and pagination
      searchQuery: ref(""),
      itemsPerPage: ref(10),

      // /* NEW — modal visibility + form model */

      newEquipment: {
        name: "",
        sport_id: "",
        price: "",
        updated_at: new Date().toISOString().slice(0, 10), // yyyy‑mm‑dd
      },
    };
  },
  computed: {
    //search
    searchedEquipment() {
      if (!this.searchQuery) return this.equipment;
      const q = this.searchQuery.toLowerCase();
      return this.equipment.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase(q)) ||
          item.category.toLowerCase().includes(this.searchQuery.toLowerCase(q))
      );
    },

    //filter
    filteredEquipment() {
      return this.equipment.filter((item) => {
        const matchesText =
          !this.filterText ||
          item.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
          item.category.toLowerCase().includes(this.filterText.toLowerCase());

        const matchesMin =
          this.minPrice === null || item.price >= this.minPrice;
        const matchesMax =
          this.maxPrice === null || item.price <= this.maxPrice;

        const matchesSearch =
          !this.searchQuery ||
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(this.searchQuery.toLowerCase());

        return matchesText && matchesMin && matchesMax && matchesSearch;
      });
    },
  },

  async created() {
    // const storedEquipment = localStorage.getItem("equipment");
    // if (storedEquipment) {
    //   this.equipment = JSON.parse(storedEquipment);
    // } else {
      await this.listing(); // Fetch from backend if no local data
    // }
  },

  methods: {
    async listing() {
      this.loading = true;
      try {
        const response = await AdminEquimentService.listing();
        this.equipment = response;

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },

    openAddDialog() {
      this.selectedEquipment = {
        id: null,
        name: "",
        categoryId: null, // Initialize categoryId here
        price: 0,
        updated_at: new Date().toISOString().slice(0, 10),
      };
      this.showAddDialog = true;
      this.imagePreview = null; // Clear the previous image preview
    },

    openEditDialog(item) {
      this.isEditMode = true;
      this.selectedEquipment = {
        ...item,
        categoryId: item.sport_id, // Set the current category ID for editing
      };
      this.imagePreview = this.fileUrl + item.image || null;
      this.selectedImage = null; // Clear any previously selected image
      this.showAddDialog = true; // Open the dialog
    },

    closeAddEditDialog() {
      this.showAddDialog = false;
    },

    closeAddDialog() {
      this.showAddDialog = false;
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        // Convert the file to a base64 string
        reader.onloadend = () => {
          // Store the base64 string in localStorage
          localStorage.setItem("uploadedImage", reader.result);

          // Optionally, set the imagePreview for immediate display
          this.imagePreview = reader.result; // or use URL.createObjectURL(file) instead
        };

        // Read the file as a Data URL
        reader.readAsDataURL(file);
      }
    },
    loadImage() {
      const storedImage = localStorage.getItem("uploadedImage");
      if (storedImage) {
        this.imagePreview = storedImage; // Set for display
      }
    },

    clearImage() {
      localStorage.removeItem("uploadedImage");
      this.imagePreview = null; // Clear the preview
    },

    async confirmAddEdit() {
      const newId = this.equipment.length
        ? Math.max(...this.equipment.map((e) => e.id)) + 1
        : 1;

      if (this.isEditMode) {
        const index = this.equipment.findIndex(
          (e) => e.id === this.selectedEquipment.id
        );
        const item = {
          ...this.selectedEquipment,
          image: this.imagePreview || this.equipment[index].image,
          sport_id: this.selectedEquipment.categoryId,
        }
        const response = await AdminEquimentService.updateEquipment(this.equipment[index].id,item);
        
      } else {
        
        const item = {
          ...this.selectedEquipment,
          image: this.imagePreview,
          sport_id: this.selectedEquipment.categoryId, // Ensure this is set correctly
        }

        const response = await AdminEquimentService.createEquipment(item);
      }
      this.closeAddEditDialog();
      
      await this.listing();
    },

    openDeleteDialog(item) {
      this.selectedEquipment = { ...item };
      this.showDeleteDialog = true;
    },

    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },

    async confirmDelete() {
      // Update localStorage after deletion
      const response = await AdminEquimentService.deleteEquipment(this.selectedEquipment.id);
      this.equipment = this.equipment.filter(
        (e) => e.id !== this.selectedEquipment.id
      );
      this.closeDeleteDialog();
    },

    getCategoryName(sportId) {
      // console.log("Sport ID:", sportId);
      const category = this.categories.find((cat) => cat.id === sportId);
      // console.log("Found Category:", category);
      return category ? category.name : "Unknown";
    },

    async fetchCategories() {
      const response = await AdminEquimentService.fetchCategories();
      this.categories = response; // Assign the fetched categories
    },
  },
  mounted() {
    this.loadImage();
    this.fetchCategories(); // Load the image when the component is mounted
  },
};
</script>
