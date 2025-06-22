<script>
import http from '@/API/axiosInstance';

export default {
  name: 'Carousel',
  data() {
    return {
      equipmentData: {},
      showModal: false,
      selectedItem: null,
      selectedQuantity: 1,
      selectedPayment: '',
      qrImages: {
        1: '/images/qr_aba.jpg',      // Assuming id=1 is ABA
        2: '/images/qr_acleda.jpg',   // id=2 ACLEDA
        3: '/images/qr_cash.jpg'      // id=3 CASH or no QR
      },
      showSuccessDialog: false,
      paymentMethods: []  // empty, will fetch dynamically
    };
  },
  mounted() {
    this.fetchEquipments();
    this.fetchPaymentMethods();
  },
  methods: {
    fetchEquipments() {
      http.get('/public/home')
        .then(response => {
          this.equipmentData = response.data?.data || {};
        })
        .catch(err => {
          console.error('❌ Equipment fetch error:', err.response?.data || err.message);
        });
    },
    fetchPaymentMethods() {
      http.get('/user/equipments/data-setup')
        .then(response => {
          // response.data.data.payments_method based on your backend response structure
          this.paymentMethods = response.data?.data?.payments_method || [];
        })
        .catch(err => {
          console.error('❌ Payment methods fetch error:', err.response?.data || err.message);
          // fallback to default if you want
          // this.paymentMethods = [...];
        });
    },
    openModal(item) {
      this.selectedItem = item;
      this.selectedQuantity = 1;
      this.selectedPayment = '';
      this.showModal = true;
    },
    async confirmPurchase() {
      if (!this.selectedPayment) {
        alert('Please select a payment method.');
        return;
      }

      const payload = {
        equipments_id: this.selectedItem.id,
        qty: this.selectedQuantity,
        payment_method_id: this.selectedPayment
      };

      try {
        const res = await http.post('/user/equipments', payload);
        console.log("✅ Backend response:", res.data);
        this.showModal = false;
        this.showSuccessDialog = true;
      } catch (error) {
        console.error('❌ Purchase error:', error?.response?.data || error.message);
        alert('❌ ' + (error?.response?.data?.message || 'Internal Server Error'));
      }
    }
  },
  computed: {
    totalPrice() {
      return this.selectedItem ? this.selectedItem.price * this.selectedQuantity : 0;
    },
    qrImage() {
      return this.qrImages[this.selectedPayment] || '';
    }
  }
};
</script>


<template>
  <div class="space-y-20 px-8 py-12 bg-white">
    <div v-for="(items, sport) in equipmentData" :key="sport">
      <h2 class="text-4xl font-bold text-teal-600 mb-10 text-center">{{ sport }}</h2>
      <!-- equipment card carousel -->
<div class="w-full flex justify-center">
  <div class="w-[1300px] h-full max-w-full px-4">
    <div class="overflow-x-auto">
      <div class="flex space-x-6 pb-2 scrollbar-thin snap-x snap-mandatory">
        <div
          v-for="(item, index) in equipmentData[sport]"
          :key="index"
          class="flex-shrink-0 snap-start w-72"
        >
          <div
            class="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer"
            @click="openModal(item)"
          >
          <img
            :src="`/images/${item.image}`"
            alt="equipment image"
            class="h-60 w-full object-cover rounded-t-xl"
          />

            <div class="p-4">
              <p class="text-xl font-bold text-gray-800">${{ item.price }}</p>
              <p class="text-gray-600 mt-1 mb-3">{{ item.name }}</p>
              <p class="text-sm text-teal-600 hover:underline font-medium">Click to buy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-100/20 z-50 flex items-center justify-center px-4">
      <div class="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative">
        <!-- Close button -->
        <button
          @click="showModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-teal-600 text-2xl"
        >×</button>

        <h2 class="text-2xl font-bold text-teal-700 mb-5">Buy Equipment</h2>

        <div class="space-y-2 mb-6">
          <div class="flex justify-between">
            <p class="text-gray-800 font-medium ">Item: {{ selectedItem?.name }}</p>
          <img
              :src="selectedItem ? `/images/${selectedItem.image}` : ''"
              alt="equipment image"
              class="h-16 w-16 object-cover rounded-t-xl"
            />
          </div>
          <p class="text-gray-800 font-medium">Description: {{ selectedItem?.description }}</p>
          <p class="text-gray-600">Price: ${{ selectedItem?.price }}</p>
          

        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
          <input
            v-model.number="selectedQuantity"
            type="number"
            min="1"
            class="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          />
           <p class="text-gray-600">Total Price: ${{ totalPrice }}</p>
        </div>

<div class="mb-5">
  <label for="payment-method" class="block text-sm font-semibold text-gray-700 mb-2">
    Select Payment Method:
  </label>
  <select
    id="payment-method"
    v-model.number="selectedPayment"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
    required
  >
    <option value="" disabled>Select a payment method</option>
    <option
      v-for="method in paymentMethods"
      :key="method.id"
      :value="method.id"
    >
      {{ method.name }}
    </option>
  </select>
</div>

<!-- Show QR only if payment method has QR -->
<div v-if="qrImage" class="mb-5 text-center">
  <p class="text-sm text-gray-500 mb-2">
    Scan this QR with {{ paymentMethods.find(pm => pm.id === selectedPayment)?.name }} App:
  </p>
  <img :src="qrImage" alt="Payment QR Code" class="w-40 mx-auto border rounded-md" />
</div>

        <div v-if="selectedPayment === 'ABA'" class="mb-5 text- center">
          <p class="text-sm text-gray-500 mb-2">Scan this QR with ABA App:</p>
          <img :src="qrImage.jpg" alt="ABA QR Code" class="w-40 mx-auto border rounded-md" />
        </div>
        <div class="flex justify-between">
          <div>
          <button
            @click="confirmPurchase"
            class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Confirm Purchase
          </button>
        </div>
        </div>

      </div>
    </div>
    <!-- Success Dialog -->
<div v-if="showSuccessDialog" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
  <div class="bg-white rounded-xl max-w-md w-full p-6 text-center shadow-xl">
    <h3 class="text-2xl font-bold text-green-600 mb-3">Purchase Successful!</h3>
    <p class="text-gray-700 mb-4">Your equipment purchase is pending admin confirmation.</p>
    <button
      @click="showSuccessDialog = false"
      class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold"
    >
      Close
    </button>
  </div>
</div>

  </div>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #14b8a6; 
  border-radius: 10px;
}
</style>

