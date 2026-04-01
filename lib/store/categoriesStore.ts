
import { create } from 'zustand';
import { LocationType, Region } from '@/types/categories';

interface Categories {
  locationTypes: LocationType[];
  regions: Region[];
}

type CategoriesStore = {
  categories: Categories;
  setLocationTypes: (locationTypes: LocationType[]) => void;
  setRegions: (regions: Region[]) => void;
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: {
    locationTypes: [],
    regions: [],
  },
  setLocationTypes: (locationTypes) =>
    set((state) => ({ categories: { ...state.categories, locationTypes } })),
  setRegions: (regions) =>
    set((state) => ({ categories: { ...state.categories, regions } })),
}));