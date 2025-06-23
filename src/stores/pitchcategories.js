import { defineStore } from 'pinia';
import axios from '@/API/axiosInstance';

export const usePitchCategoryStore = defineStore('pitchCategory', {
  state: () => ({
    categories: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCategoriesBySportId(sportId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`public/venue/pitch-categories?sport_id=${sportId}`);
        this.categories = response.data;
      } catch (err) {
        console.error('Error fetching pitch categories:', err);
        this.error = 'Failed to load pitch categories.';
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getCategoryById: (state) => (id) => state.categories.find(c => c.id === id),
  },
});
