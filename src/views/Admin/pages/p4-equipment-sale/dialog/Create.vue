<script setup>
import { ref, onMounted, watch } from 'vue'
import AdminEquimentSaleService from '../service'

const props = defineProps({
  show: Boolean,
  sale: Object // The sale object to edit, or null for create
})
const emit = defineEmits(['close', 'saved'])

const form = ref({
  user_id: '',
  equipments_id: '',
  qty: 1,
  payment_id: '',
  total_price: ''
})

const users = ref([])
const equipments = ref([])
const payments = ref([])

// Load setup options from API
const fetchSetup = async () => {
  const res = await AdminEquimentSaleService.setup()
  users.value = res.users || []
  equipments.value = res.equipments || []
  payments.value = res.payments || []
}

// Watch for open/close & edit/create mode
watch(
  () => props.sale,
  (val) => {
    if (val) {
      // Edit mode: fill values
      form.value = {
        user_id: val.user_id || '',
        equipments_id: val.equipments_id || '',
        qty: val.qty || 1,
        payment_id: val.payment_id || '',
        total_price: val.total_price || ''
      }
    } else {
      // Create mode: blank form
      form.value = {
        user_id: '',
        equipments_id: '',
        qty: 1,
        payment_id: '',
        total_price: ''
      }
    }
  },
  { immediate: true }
)

const submit = async () => {
  const payload = {
    user_id: form.value.user_id || null,
    equipments_id: form.value.equipments_id,
    qty: form.value.qty,
    payment_id: form.value.payment_id || null,
    total_price: form.value.total_price
  }
  if (props.sale && props.sale.id) {
    // Update
    await AdminEquimentSaleService.update(props.sale.id, payload)
  } else {
    // Create
    await AdminEquimentSaleService.create(payload)
  }
  emit('saved')
}

onMounted(fetchSetup)
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-lg font-bold mb-4">
        {{ props.sale ? 'Edit Equipment Sale' : 'Create Equipment Sale' }}
      </h2>
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
            <label class="block text-sm font-medium text-gray-700">Equipment</label>
            <select v-model="form.equipments_id" required class="w-full border px-3 py-2 rounded">
              <option value="" disabled>Select equipment</option>
              <option v-for="eq in equipments" :key="eq.id" :value="eq.id">
                {{ eq.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Quantity</label>
            <input v-model.number="form.qty" required min="1" type="number" class="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Payment</label>
            <select v-model="form.payment_id" class="w-full border px-3 py-2 rounded">
              <option v-for="p in payments" :key="p.id" :value="p.id">
                {{ p.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Total Price</label>
            <input v-model.number="form.total_price" required min="0" type="number" step="0.01" class="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            {{ props.sale ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
