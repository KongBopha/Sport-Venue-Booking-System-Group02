<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-lg font-bold mb-4">Create Pitch Category</h2>

      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="form.name" required class="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Base Price</label>
            <input v-model.number="form.price" type="number" required class="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Required Players</label>
            <input v-model.number="form.required_players" type="number" required class="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Volume</label>
            <input v-model.number="form.volume" type="number" required class="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Sport</label>
            <select v-model.number="form.sport_id" required class="w-full border px-3 py-2 rounded">
              <option disabled value="">Select Sport</option>
              <option v-for="sport in sports" :key="sport.id" :value="sport.id">
                {{ sport.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" @change="onImageSelected" accept="image/*" class="w-full border px-3 py-2 rounded" />
            <div v-if="form.image" class="mt-2">
              <img :src="form.image" class="h-20 object-cover rounded border" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <button type="button" @click="$emit('cancel')" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminPitchCategoryService from '../service';

export default {
  emits: ['created', 'cancel'],
  data() {
    return {
      form: {
        name: '',
        price: null,
        required_players: null,
        volume: null,
        sport_id: '',
        image: '' // base64 image
      },
      sports: []
    };
  },
  mounted() {
    this.loadSports();
  },
  methods: {
    async loadSports() {
      try {
        const setup = await AdminPitchCategoryService.setupData();
        this.sports = setup.sports || [];
        console.log('✅ Sports loaded:', this.sports);
      } catch (err) {
        console.error('❌ Failed to load sports:', err);
      }
    },

    onImageSelected(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.form.image = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async submit() {
      try {
        const response = await AdminPitchCategoryService.create(this.form);
        const newCategory = {
          id: response.id,
          name: response.name,
          basePrice: response.price,
          maxCapacity: response.required_players,
          volume: response.volume,
          img: response.img,
          pitchCount: 0,
          editName: response.name,
          editPrice: response.price,
          editCapacity: response.required_players,
          editVolume: response.volume
        };

        this.$emit('created', newCategory);
        this.$emit('cancel');
        setTimeout(() => {
          alert('✅ Category created successfully!');
        }, 100);
      } catch (error) {
        console.error('Create Error:', error);
        alert('❌ Failed to create category');
      }
    }
  }
};
</script>
