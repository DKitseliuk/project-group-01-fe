// lib/queries/categories.ts

import { queryOptions } from '@tanstack/react-query';
import { getLocationTypes, getRegions } from '../api/serverApi';

export const categoriesOptionsServer = {
  locationTypes: queryOptions({
    queryKey: ['locationTypes'],
    queryFn: getLocationTypes,
    staleTime: Infinity,
    gcTime: Infinity,
  }),
  regions: queryOptions({
    queryKey: ['regions'],
    queryFn: getRegions,
    staleTime: Infinity,
    gcTime: Infinity,
  }),
};
