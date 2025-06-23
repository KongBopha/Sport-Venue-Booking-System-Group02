<script setup>
import { ref, onMounted } from 'vue'
import AdminBlackListService from '../service'


const emit = defineEmits(['close', 'created'])

const form = ref({
  user_id: null,
  reason: ''
})

const users = ref([])

const fetchSetup = async () => {
  const res = await AdminBlackListService.setup()
  users.value = res.users
}

const submit = async () => {
  await AdminBlackListService.create(form.value)
  emit('created')
}

onMounted(fetchSetup)
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-lg font-bold mb-4">Add to Blacklist</h2>
      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">User</label>
            <select v-model="form.user_id" required class="w-full border px-3 py-2 rounded">
              <option value="" disabled>Select user</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} - {{ user.phone }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Reason</label>
            <input v-model="form.reason" required class="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
