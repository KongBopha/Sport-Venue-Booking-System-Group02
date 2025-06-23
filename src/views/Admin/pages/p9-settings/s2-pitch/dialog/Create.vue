<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-lg font-bold mb-4">Create Pitch</h2>

      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Pitch Name</label>
            <input v-model="form.name" required class="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <input v-model="form.location" required class="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select v-model="form.category_id" required class="w-full border px-3 py-2 rounded">
              <option disabled value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <button type="button" @click="$emit('cancel')" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminPitchService from '../service'

export default {
  emits: ['created', 'cancel'],
  data() {
    return {
      form: {
        name: '',
        location: '',
        category_id: ''
      },
      categories: []
    }
  },
  async mounted() {
    await this.loadCategories()
  },
  methods: {
    async loadCategories() {
      try {
        const setup = await AdminPitchService.getSetupData()
        this.categories = setup.categories || setup // if it's a flat array
      } catch (error) {
        console.error('❌ Failed to load pitch categories:', error)
      }
    },

    async submit() {
      try {
        const created = await AdminPitchService.create(this.form)
        this.$emit('created', created)
        this.$emit('cancel')
      } catch (error) {
        console.error('Create Error:', error)
        alert('❌ Failed to create pitch')
      }
    }
  }
}
</script>
