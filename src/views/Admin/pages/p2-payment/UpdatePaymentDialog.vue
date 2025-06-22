<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Update Payment</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 space-y-4">
        <!-- Payment Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
          <select
            v-model="updateForm.status_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="status in setupData.payment_statuses" :key="status.id" :value="status.id">
              {{ status.name }}
            </option>
          </select>
        </div>

        <!-- Payment Method -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select
            v-model="updateForm.method_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="method in setupData.payment_methods" :key="method.id" :value="method.id">
              {{ method.name }}
            </option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="updatePayment"
            :disabled="updating"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ updating ? 'Updating...' : 'Update Payment' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import AdminPaymentService from './service'

export default {
  name: 'UpdatePaymentDialog',
  components: { X },
  props: {
    payment: {
      type: Object,
      required: true
    },
    setupData: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'updated'],
  setup(props, { emit }) {
    const updating = ref(false)

    const updateForm = reactive({
      status_id: null,
      method_id: null
    })

    const initializeForm = () => {
      updateForm.status_id = props.payment.status_id
      updateForm.method_id = props.payment.method_id
    }

    const updatePayment = async () => {
      try {
        updating.value = true
        await AdminPaymentService.update(props.payment.id, updateForm)
        emit('updated')
      } catch (error) {
        console.error('Error updating payment:', error)
        alert('Error updating payment. Please try again.')
      } finally {
        updating.value = false
      }
    }

    onMounted(() => {
      initializeForm()
    })

    return {
      updating,
      updateForm,
      updatePayment
    }
  }
}
</script>
