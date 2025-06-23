<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Time Type Configuration</h3>
      <button   @click="showCreateDialog = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Time Slot</span>
      </button>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Time Slots List -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Time Slot Types</h4>
          <div
            v-for="timeType in timeTypes"
            :key="timeType.id"
            class="border border-gray-200 overflow-y-auto rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div
                  :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    timeType.bgColor,
                  ]"
                >
                  <Clock :class="['w-5 h-5', timeType.iconColor]" />
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">{{ timeType.name }}</h5>
                  <p class="text-sm text-gray-500">
                    <template v-if="editingId === timeType.id">
                      <input
                        v-model="editingForm.from_time"
                        type="time"
                        class="w-24 border px-2 py-1 rounded"
                      />
                      -
                      <input
                        v-model="editingForm.to_time"
                        type="time"
                        class="w-24 border px-2 py-1 rounded"
                      />
                    </template>
                    <template v-else>{{ timeType.timeRange }}</template>
                  </p>
                </div>
              </div>
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  timeType.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800',
                ]"
              >
                {{ timeType.status }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <span class="text-gray-500">Price Multiplier:</span>
                <template v-if="editingId === timeType.id">
                  <input
                    type="number"
                    step="0.01"
                    v-model.number="editingForm.price_multiplier"
                    class="ml-2 border px-2 py-1 text-sm rounded w-24"
                  />
                </template>
                <template v-else>
                  <span class="font-medium ml-1">{{ timeType.priceMultiplier }}x</span>
                </template>
              </div>
              <div>
                <span class="text-gray-500">Duration:</span>
                <span class="font-medium ml-1">{{ formatDuration(timeType.duration) }}</span>
              </div>
            </div>

            <div class="flex space-x-2">
              <template v-if="editingId === timeType.id">
                <button
                  class="flex-1 text-green-600 hover:text-green-700 text-sm font-medium"
                  @click="saveEdit(timeType)"
                >
                  Save
                </button>
                <button
                  class="flex-1 text-gray-600 hover:text-gray-800 text-sm font-medium"
                  @click="cancelEdit"
                >
                  Cancel
                </button>
              </template>
              <template v-else>
                <button
                  class="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  @click="startEdit(timeType)"
                >
                  Edit
                </button>
                <button
                  class="flex-1 text-red-600 hover:text-red-700 text-sm font-medium"
                  @click="promptDelete(timeType)"
                >
                  Delete
                </button>
              </template>
            </div>
          </div>
        </div>


        <!-- Time Schedule Grid -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Daily Schedule Overview</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-24 gap-1 mb-2">
              <div v-for="hour in 24" :key="hour" class="text-xs text-center text-gray-500">
                {{ hour - 1 }}
              </div>
            </div>
            <div v-for="day in weekDays" :key="day" class="mb-2">
              <div class="text-sm font-medium text-gray-700 mb-1">{{ day }}</div>
              <div class="grid grid-cols-24 gap-1">
                <div v-for="hour in 24" :key="hour" 
                     :class="['h-6 rounded', getTimeSlotColor(day, hour - 1)]"
                     :title="getTimeSlotInfo(day, hour - 1)">
                </div>
              </div>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-xs">
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-blue-200 rounded"></div>
                <span>Off-Peak</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-green-200 rounded"></div>
                <span>Regular</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-yellow-200 rounded"></div>
                <span>Peak</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-red-200 rounded"></div>
                <span>Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteConfirmDialog
  :show="showDeleteDialog"
  :itemToDelete="deletingItem"
  :submitting="submittingDelete"
  @close="showDeleteDialog = false"
  @confirm-delete="confirmDelete"
/>
<Create
  v-if="showCreateDialog"
  @cancel="showCreateDialog = false"
  @created="handleCreated"
/>


</template>

<script>
import { ref } from 'vue'
import { Clock, Plus } from 'lucide-vue-next'
import  AdminTimeTypeService  from './service';
import DeleteConfirmDialog from './dialog/DeleteConfirmDialog.vue';
import Create from './dialog/Create.vue';
export default {
  name: 'Time-Type',
  components: {
    Clock,
    Plus,
    DeleteConfirmDialog,
    Create
  },

  data() {
    return {
      timeTypes: ref([]),
      showDeleteDialog: false,
      deletingItem: null,
      submittingDelete: false,
      editingId: null,
      editingForm: {
        from_time: '',
        to_time: '',
        price_multiplier: 1
      },
      showCreateDialog: false,
    }
  },
  async created() {
    await this.listing();
  },
  methods: {
    async listing() {
      try {
        const response = await AdminTimeTypeService.listing();

          this.timeTypes = response.map((item, index) => {
            const price = item.price_multiplier;
            let bgColor = 'bg-gray-100';
            let iconColor = 'text-gray-600';
            let name = 'Normal';

            if (price < 1) {
              name = 'Off-Peak';
              bgColor = 'bg-blue-100';
              iconColor = 'text-blue-600';
            } else if (price === 1) {
              name = 'Regular';
              bgColor = 'bg-green-100';
              iconColor = 'text-green-600';
            } else if (price === 1.2) {
              name = 'Peak';
              bgColor = 'bg-yellow-100';
              iconColor = 'text-yellow-600';
            } else if (price > 1.2) {
              name = 'Premium';
              bgColor = 'bg-red-100';
              iconColor = 'text-red-600';
            }

            const from = item.from_time;
            const to = item.to_time;

            return {
              id: item.id,
              name: name,
              timeRange: `${from} - ${to}`,
              priceMultiplier: price,
              duration: 1,
              status: 'Active',
              bgColor: bgColor,
              iconColor: iconColor,
              from_time: from,       // <-- ADD THIS
              to_time: to  
            };
          });
      } catch (error) {
        console.error('Error fetching time types:', error);
      }
    },
    promptDelete(item) {
        this.deletingItem = item;
        this.showDeleteDialog = true;
      },

      async confirmDelete(item) {
          this.submittingDelete = true;
          try {
            await AdminTimeTypeService.delete(item.id);
            this.timeTypes = this.timeTypes.filter(tt => tt.id !== item.id);
            this.showDeleteDialog = false;
            this.deletingItem = null;
          } catch (error) {
            alert('Failed to delete time type.');
          } finally {
            this.submittingDelete = false;
          }
    },
    startEdit(timeType) {
      this.editingId = timeType.id;
      this.editingForm = {
        from_time: timeType.from_time,
        to_time: timeType.to_time,
        price_multiplier: timeType.priceMultiplier
      };
    },

    cancelEdit() {
      this.editingId = null;
      this.editingForm = {
        from_time: '',
        to_time: '',
        price_multiplier: 1
      };
    },

    async saveEdit(timeType) {
      try {
        await AdminTimeTypeService.update(timeType.id, {
          from_time: this.editingForm.from_time,
          to_time: this.editingForm.to_time,
          price_multiplier: this.editingForm.price_multiplier
        });
         // Update the specific item in the timeTypes list
        const updated = {
          ...timeType,
          from_time: this.editingForm.from_time,
          to_time: this.editingForm.to_time,
          priceMultiplier: this.editingForm.price_multiplier,
          timeRange: `${this.editingForm.from_time} - ${this.editingForm.to_time}`
        };

        // Recalculate name, colors, etc. if price changed
        const price = updated.priceMultiplier;
        if (price < 1) {
          updated.name = 'Off-Peak';
          updated.bgColor = 'bg-blue-100';
          updated.iconColor = 'text-blue-600';
        } else if (price === 1) {
          updated.name = 'Regular';
          updated.bgColor = 'bg-green-100';
          updated.iconColor = 'text-green-600';
        } else if (price === 1.2) {
          updated.name = 'Peak';
          updated.bgColor = 'bg-yellow-100';
          updated.iconColor = 'text-yellow-600';
        } else if (price > 1.2) {
          updated.name = 'Premium';
          updated.bgColor = 'bg-red-100';
          updated.iconColor = 'text-red-600';
        }

        // Replace only the edited item in the array
        const index = this.timeTypes.findIndex(tt => tt.id === timeType.id);
        if (index !== -1) {
          this.timeTypes.splice(index, 1, updated);
        }
        this.cancelEdit();
        // await this.listing();
      } catch (error) {
        alert('Failed to update time type.');
      }
    },
    handleCreated(newTimeType) {
      const time = newTimeType.priceMultiplier;

      if (time < 1) {
        newTimeType.name = 'Off-Peak';
        newTimeType.bgColor = 'bg-blue-100';
        newTimeType.iconColor = 'text-blue-600';
      } else if (time === 1) {
        newTimeType.name = 'Regular';
        newTimeType.bgColor = 'bg-green-100';
        newTimeType.iconColor = 'text-green-600';
      } else if (time === 1.2) {
        newTimeType.name = 'Peak';
        newTimeType.bgColor = 'bg-yellow-100';
        newTimeType.iconColor = 'text-yellow-600';
      } else {
        newTimeType.name = 'Premium';
        newTimeType.bgColor = 'bg-red-100';
        newTimeType.iconColor = 'text-red-600';
      }

      newTimeType.duration = newTimeType.to_time - newTimeType.from_time;
      newTimeType.status = 'Active';

      this.timeTypes.unshift(newTimeType); // ⬅ Insert at the top
      this.showCreateDialog = false;
    },
    formatDuration(duration) {
      const hours = Math.floor(duration);
      const minutes = Math.round((duration - hours) * 60);
      return `${hours}h ${minutes}mn`;
    }

  }

}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const getTimeSlotColor = (day, hour) => {
  if (hour >= 6 && hour < 9) return 'bg-blue-200'
  if (hour >= 9 && hour < 17) return 'bg-green-200'
  if (hour >= 17 && hour < 21) return 'bg-yellow-200'
  if (hour >= 21 && hour < 23) return 'bg-red-200'
  return 'bg-gray-100'
}

const getTimeSlotInfo = (day, hour) => {
  if (hour >= 6 && hour < 9) return 'Off-Peak Hours'
  if (hour >= 9 && hour < 17) return 'Regular Hours'
  if (hour >= 17 && hour < 21) return 'Peak Hours'
  if (hour >= 21 && hour < 23) return 'Premium Hours'
  return 'Closed'
}
</script>
