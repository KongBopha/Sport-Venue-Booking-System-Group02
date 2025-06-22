<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-lg font-bold mb-4">Create Time Type</h2>

      <form @submit.prevent="submit">
        <div class="space-y-4">
      <!-- From Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700">From Time</label>
          <input
            v-model="form.from_time"
            type="time"
            required
            class="w-full border px-3 py-2 rounded"
            placeholder="Start time"
          />
        </div>

        <!-- To Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700">To Time</label>
          <input
            v-model="form.to_time"
            type="time"
            required
            class="w-full border px-3 py-2 rounded"
            placeholder="End time"
          />
        </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Price Multiplier</label>
            <input v-model.number="form.price_multiplier" type="number" step="0.01" min="0" required class="w-full border px-3 py-2 rounded" placeholder="e.g., 1.25" />
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
import AdminTimeTypeService from '../service';

export default {
  emits: ['created', 'cancel'],
  data() {
    return {
      form: {
        from_time: null,
        to_time: null,
        price_multiplier: 1.0
      }
    };
  },
  methods: {
    async submit() {
      try {
        const [fromHour, fromMinute] = this.form.from_time.split(':').map(Number);
        const [toHour, toMinute] = this.form.to_time.split(':').map(Number);

        if (
          isNaN(fromHour) || isNaN(fromMinute) ||
          isNaN(toHour) || isNaN(toMinute)
        ) {
          alert('❌ Invalid time format.');
          return;
        }

        const fromDecimal = fromHour + fromMinute / 60;
        const toDecimal = toHour + toMinute / 60;

        if (fromDecimal >= toDecimal) {
          alert('❌ "From Time" must be earlier than "To Time".');
          return;
        }

        const payload = {
          from_time: fromDecimal,
          to_time: toDecimal,
          price_multiplier: this.form.price_multiplier
        };

        const response = await AdminTimeTypeService.create(payload);

        const created = {
          id: response.id,
          from_time: response.from_time,
          to_time: response.to_time,
          priceMultiplier: response.price_multiplier,
          timeRange: `${this.form.from_time} - ${this.form.to_time}`
        };

        this.$emit('created', created);
        this.$emit('cancel');
        setTimeout(() => alert('✅ Time type created successfully!'), 100);
      } catch (error) {
        console.error('Create Error:', error);
        alert('❌ Failed to create time type');
      }
    }

  }
};
</script>
