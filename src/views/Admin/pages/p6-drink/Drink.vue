<template>
    <div class="space-y-8">
    <!-- Static Dashboard Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Total Items -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Items</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ drinks.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Coffee class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <!-- Top Drink (Static) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Top Drink</p>
            <p class="text-xl font-bold text-gray-900 mt-2">Pocariwat Vigor Champion</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Package class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <!-- Average Price (Static) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg. Price</p>
           <p class="text-3xl font-bold text-gray-900 mt-2">${{ averagePrice }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <X class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Drinks Inventory Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Drink Inventory</h3>
        <div class="flex items-center space-x-2">
          <button
            @click="showFilterInput = !showFilterInput"
            class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter class="w-4 h-4 inline mr-1" />
            Filter
          </button>
          <div v-if="showFilterInput" class="px-6 py-4 bg-gray-50 rounded-b-md">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Filter by Name -->
              <div>
                <label class="block text-sm text-gray-700 mb-1">Filter by Name</label>
                <input
                  v-model="filterText"
                  type="text"
                  placeholder="Enter drink name"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <!-- Min Price -->
              <div>
                <label class="block text-sm text-gray-700 mb-1">Min Price</label>
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
                <label class="block text-sm text-gray-700 mb-1">Max Price</label>
                <input
                  v-model.number="maxPrice"
                  type="number"
                  min="0"
                  placeholder="10.00"
                  class="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>


          <button @click="openAddDialog" class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus class="w-4 h-4 inline mr-1" />
            Add Drink
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="drink in filteredDrinks" :key="drink.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg overflow-hidden mr-4">
                    <img :src="drink.image" alt="Drink Image" class="w-full h-full object-cover" />
                  </div>
                  <div class="text-sm font-medium text-gray-900">{{ drink.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ drink.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <button @click="openEditDialog(drink)" class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button @click="openDeleteDialog(drink)" class="p-1 hover:bg-gray-100 rounded" title="Delete">
                    <Trash2 class="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Dialog -->
    <div v-if="showAddEditDialog" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">{{ isEditMode ? 'Edit Drink' : 'Add Drink' }}</h2>
        <form @submit.prevent="confirmAddEdit">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Name</label>
            <input v-model="selectedDrink.name" required type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Price</label>
            <input v-model.number="selectedDrink.price" required type="number" min="0" step="0.01" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeAddEditDialog" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteDialog" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete <strong>{{ selectedDrink.name }}</strong>?</p>
        <div class="flex justify-end space-x-2 mt-6">
          <button @click="closeDeleteDialog" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref ,computed} from 'vue'
import { Coffee, Package, X, Filter, Plus, Trash2 } from 'lucide-vue-next'
import AdminDrinkService from './service'

const drinks = ref([])
const showAddEditDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedDrink = ref({
  id: null,
  name: '',
  price: 0,
  image: ''
})
const isEditMode = ref(false)
const showFilterInput = ref(false)
const filterText = ref('')
const minPrice = ref(null)
const maxPrice = ref(null)


// Fetch drinks from backend
const fetchDrinks = async () => {
  try {
    const data = await AdminDrinkService.listing()
    drinks.value = data.map(d => ({
      ...d,
      image: d.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/250px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg'  
    }))
  } catch (error) {
    console.error('Error fetching drinks:', error)
  }
}
const filteredDrinks = computed(() => {
  // Normalize input
  const min = minPrice.value === '' ? null : minPrice.value
  const max = maxPrice.value === '' ? null : maxPrice.value

  return drinks.value.filter(drink => {
    const matchesName =
      filterText.value === '' ||
      drink.name.toLowerCase().includes(filterText.value.toLowerCase())

    const matchesMinPrice = min === null || drink.price >= min
    const matchesMaxPrice = max === null || drink.price <= max

    return matchesName && matchesMinPrice && matchesMaxPrice
  })
})
const averagePrice = computed(() => {
  if (drinks.value.length === 0) return 0
  const total = drinks.value.reduce((sum, drink) => sum + (drink.price || 0), 0)
  return (total / drinks.value.length).toFixed(2)
})

// Open Add Dialog
const openAddDialog = () => {
  selectedDrink.value = { id: null, name: '', price: 0, image: '' }
  isEditMode.value = false
  showAddEditDialog.value = true
}

// Open Edit Dialog
const openEditDialog = (drink) => {
  selectedDrink.value = { ...drink }  
  isEditMode.value = true
  showAddEditDialog.value = true
}

// Close Add/Edit Dialog
const closeAddEditDialog = () => {
  showAddEditDialog.value = false
}

// Confirm Add or Edit
const confirmAddEdit = async () => {
  try {
    if (isEditMode.value) {
      await AdminDrinkService.updateDrink(selectedDrink.value.id, selectedDrink.value)
    } else {
      await AdminDrinkService.addDrink(selectedDrink.value)  
    }
    showAddEditDialog.value = false
    await fetchDrinks()
  } catch (error) {
    console.error('Save failed:', error)
  }
}

// Open Delete Dialog
const openDeleteDialog = (drink) => {
  selectedDrink.value = { ...drink }
  showDeleteDialog.value = true
}

// Close Delete Dialog
const closeDeleteDialog = () => {
  showDeleteDialog.value = false
}

// Confirm Delete
const confirmDelete = async () => {
  try {
    await AdminDrinkService.deleteDrink(selectedDrink.value.id)
    showDeleteDialog.value = false
    await fetchDrinks()
  } catch (error) {
    console.error('Delete failed:', error)
  }
}
  fetchDrinks();
</script>
