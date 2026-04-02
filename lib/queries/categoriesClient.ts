// lib/queries/categoriesClient.ts

import { queryOptions } from '@tanstack/react-query';
import { getLocationTypes, getRegions } from '../api/clientApi';

export const categoriesOptionsClient = {
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
