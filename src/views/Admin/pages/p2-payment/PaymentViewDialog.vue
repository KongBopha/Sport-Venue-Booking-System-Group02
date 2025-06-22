<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">
          Payment Details - {{ payment.receipt_number || `#${payment.id}` }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Payment Information -->
          <div class="space-y-6">
            <!-- Payment Status -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-md font-medium text-gray-900 mb-3">Payment Information</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Status:</span>
                  <span 
                    :class="['px-2 py-1 text-xs font-medium rounded-full']"
                    :style="{ 
                      backgroundColor: payment.payment_status?.color + '20', 
                      color: payment.payment_status?.color 
                    }"
                  >
                    {{ payment.payment_status?.name }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Total Amount:</span>
                  <span class="text-lg font-bold text-green-600">${{ payment.total_price }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Created:</span>
                  <span class="text-sm text-gray-900">{{ formatDate(payment.created_at) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Updated:</span>
                  <span class="text-sm text-gray-900">{{ formatDate(payment.updated_at) }}</span>
                </div>
              </div>
              <div class="mt-4">
                <button
                  @click="showUpdatePaymentDialog = true"
                  class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Payment
                </button>
              </div>
            </div>

            <!-- Booking Information -->
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-md font-medium text-gray-900">Booking Information</h4>
                <button
                  @click="showUpdateBookingDialog = true"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Booking
                </button>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Booking ID:</span>
                  <span class="text-sm font-medium text-gray-900">#{{ payment.booking?.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Customer:</span>
                  <span class="text-sm text-gray-900">{{ payment.booking?.user?.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Drink Payments -->
          <div class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-lg">
              <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h4 class="text-md font-medium text-gray-900">Drink Orders</h4>
                <button
                  @click="showCreateDrinkDialog = true"
                  class="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                >
                  <Plus class="w-4 h-4" />
                  Add Drink
                </button>
              </div>
              <div class="p-4">
                <div v-if="payment.drinks_payments?.length === 0" class="text-center text-gray-500 py-8">
                  No drink orders yet
                </div>
                <div v-else class="space-y-3">
                  <div
                    v-for="drinkPayment in payment.drinks_payments"
                    :key="drinkPayment.id"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Coffee class="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ drinkPayment.drink?.name }}</p>
                        <p class="text-sm text-gray-500">Qty: {{ drinkPayment.qty }}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="font-medium text-gray-900">${{ drinkPayment.total_price }}</span>
                      <button
                        @click="editDrinkPayment(drinkPayment)"
                        class="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteDrinkPayment(drinkPayment)"
                        class="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Update Payment Dialog -->
      <UpdatePaymentDialog
        v-if="showUpdatePaymentDialog"
        :payment="payment"
        :setup-data="setupData"
        @close="showUpdatePaymentDialog = false"
        @updated="onPaymentUpdated"
      />

      <!-- Update Booking Dialog -->
      <UpdateBookingDialog
        v-if="showUpdateBookingDialog"
        :booking="payment.booking"
        @close="showUpdateBookingDialog = false"
        @updated="onBookingUpdated"
      />

      <!-- Create/Edit Drink Dialog -->
      <DrinkPaymentDialog
        v-if="showCreateDrinkDialog || showEditDrinkDialog"
        :payment-id="payment.id"
        :drink-payment="selectedDrinkPayment"
        :is-edit="showEditDrinkDialog"
        @close="closeDrinkDialogs"
        @saved="onDrinkPaymentSaved"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { X, Plus, Coffee } from 'lucide-vue-next'
import AdminPaymentService from './service'
import UpdatePaymentDialog from './UpdatePaymentDialog.vue'
import UpdateBookingDialog from './UpdateBookingDialog.vue'
import DrinkPaymentDialog from './DrinkPaymentDialog.vue'

export default {
  name: 'PaymentViewDialog',
  components: {
    X,
    Plus,
    Coffee,
    UpdatePaymentDialog,
    UpdateBookingDialog,
    DrinkPaymentDialog
  },
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
    const showUpdatePaymentDialog = ref(false)
    const showUpdateBookingDialog = ref(false)
    const showCreateDrinkDialog = ref(false)
    const showEditDrinkDialog = ref(false)
    const selectedDrinkPayment = ref(null)

    const editDrinkPayment = (drinkPayment) => {
      selectedDrinkPayment.value = drinkPayment
      showEditDrinkDialog.value = true
    }

    const deleteDrinkPayment = async (drinkPayment) => {
      if (confirm('Are you sure you want to delete this drink order?')) {
        try {
          await AdminPaymentService.deleteDrinkPayment(drinkPayment.id)
          emit('updated')
        } catch (error) {
          console.error('Error deleting drink payment:', error)
          alert('Error deleting drink order. Please try again.')
        }
      }
    }

    const closeDrinkDialogs = () => {
      showCreateDrinkDialog.value = false
      showEditDrinkDialog.value = false
      selectedDrinkPayment.value = null
    }

    const onPaymentUpdated = () => {
      showUpdatePaymentDialog.value = false
      emit('updated')
    }

    const onBookingUpdated = () => {
      showUpdateBookingDialog.value = false
      emit('updated')
    }

    const onDrinkPaymentSaved = () => {
      closeDrinkDialogs()
      emit('updated')
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      showUpdatePaymentDialog,
      showUpdateBookingDialog,
      showCreateDrinkDialog,
      showEditDrinkDialog,
      selectedDrinkPayment,
      editDrinkPayment,
      deleteDrinkPayment,
      closeDrinkDialogs,
      onPaymentUpdated,
      onBookingUpdated,
      onDrinkPaymentSaved,
      formatDate
    }
  }
}
</script>
