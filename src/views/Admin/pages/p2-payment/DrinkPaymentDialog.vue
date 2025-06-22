<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ isEdit ? 'Edit' : 'Add' }} Drink Order
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 space-y-4">
        <!-- Drink Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Drink</label>
          <select
            v-model="drinkForm.drink_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="calculateTotal"
          >
            <option value="">Select Drink</option>
            <option v-for="drink in availableDrinks" :key="drink.id" :value="drink.id">
              {{ drink.name }} - ${{ drink.price }}
            </option>
          </select>
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            v-model.number="drinkForm.qty"
            type="number"
            min="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @input="calculateTotal"
          />
        </div>

        <!-- Total Price Display -->
        <div class="bg-gray-50 p-3 rounded-lg">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">Total Price:</span>
            <span class="text-lg font-bold text-green-600">${{ drinkForm.total_price.toFixed(2) }}</span>
          </div>
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
            @click="saveDrinkPayment"
            :disabled="saving || !isFormValid"
            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : (isEdit ? 'Update' : 'Add') }} Drink
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import AdminPaymentService from './service'

export default {
  name: 'DrinkPaymentDialog',
  components: { X },
  props: {
    paymentId: {
      type: Number,
      required: true
    },
    drinkPayment: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'saved'],
  setup(props, { emit }) {
    const saving = ref(false)
    const availableDrinks = ref([
      { id: 1, name: 'Coffee', price: 3.50 },
      { id: 2, name: 'Tea', price: 2.50 },
      { id: 3, name: 'Soda', price: 2.00 },
      { id: 4, name: 'Water', price: 1.50 },
      { id: 5, name: 'Energy Drink', price: 4.00 }
    ])

    const drinkForm = reactive({
      drink_id: null,
      qty: 1,
      total_price: 0
    })

    const isFormValid = computed(() => {
      return drinkForm.drink_id && drinkForm.qty > 0
    })

    const initializeForm = () => {
      if (props.isEdit && props.drinkPayment) {
        drinkForm.drink_id = props.drinkPayment.drink_id
        drinkForm.qty = props.drinkPayment.qty
        drinkForm.total_price = props.drinkPayment.total_price
      }
    }

    const calculateTotal = () => {
      const selectedDrink = availableDrinks.value.find(d => d.id === drinkForm.drink_id)
      if (selectedDrink && drinkForm.qty > 0) {
        drinkForm.total_price = selectedDrink.price * drinkForm.qty
      } else {
        drinkForm.total_price = 0
      }
    }

    const saveDrinkPayment = async () => {
      try {
        saving.value = true
        
        if (props.isEdit) {
          await AdminPaymentService.updateDrinkPayment(props.drinkPayment.id, drinkForm)
        } else {
          await AdminPaymentService.createDrinkPayment(props.paymentId, drinkForm)
        }
        
        emit('saved')
      } catch (error) {
        console.error('Error saving drink payment:', error)
        alert('Error saving drink order. Please try again.')
      } finally {
        saving.value = false
      }
    }

    onMounted(() => {
      initializeForm()
    })

    return {
      saving,
      availableDrinks,
      drinkForm,
      isFormValid,
      calculateTotal,
      saveDrinkPayment
    }
  }
}
</script>
