import { create } from 'zustand';
import { ArchiveFilterState } from './types';

export const useFilters = create<ArchiveFilterState>((set) => ({
  status: null,
  setStatus: (status) => set({ status }),
  dateRange: null,
  setDateRange: (dateRange) => set({ dateRange }),
  taxPeriod: null,
  setTaxPeriod: (taxPeriod) => set({ taxPeriod }),
  timeRange: null,
  setTimeRange: (timeRange) => set({ timeRange }),
  resetFilters: () =>
    set({
      status: null,
      dateRange: null,
      taxPeriod: null,
      timeRange: null,
    }),
}));
