<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-lg font-bold mb-4">Create Sport</h2>

      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="form.name" required class="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="form.description" required class="w-full border px-3 py-2 rounded"></textarea>
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
import AdminSportService from '../service';

export default {
  emits: ['created', 'cancel'],
  data() {
    return {
      form: {
        name: '',
        description: '',
        image: ''
      }
    };
  },
  methods: {
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
        const response = await AdminSportService.create(this.form);
        this.$emit('created', response);
        this.$emit('cancel');
        setTimeout(() => alert('✅ Sport created successfully!'), 100);
      } catch (error) {
        console.error('Create Error:', error);
        alert('❌ Failed to create sport');
      }
    }
  }
};
</script>
