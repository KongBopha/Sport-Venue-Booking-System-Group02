import { defineStore } from 'pinia';
import axios from '@/API/axiosInstance';

export const useSportRatingStore = defineStore('sportRating', {
  state: () => ({
    ratings: [],
    average: 0,
    total: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchRatingsBySportId(sportId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`public/venue/sport-ratings?sport_id=${sportId}`);
        const data = response.data;

        this.ratings = data.reviews || [];
        this.average = parseFloat(data.average_rating) || 0;
        this.total = data.total_reviews || 0;
      } catch (error) {
        console.error('Error fetching sport ratings:', error);
        this.error = error.response?.data?.message || 'Failed to load ratings';
        this.ratings = [];
        this.average = 0;
        this.total = 0;
      } finally {
        this.loading = false;
      }
    },
  },
});
