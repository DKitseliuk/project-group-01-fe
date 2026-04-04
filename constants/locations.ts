import { LocationsSearchParams } from '@/types/location';
import { LOCATIONS_DEFAULT_PAGINATION } from './pagination';
import { LOCATIONS_DEFAULT_SORTING } from './sorting';

export const HOME_POPULATION_LOCATIONS_PARAMS = {
  page: 1,
  perPage: 9,
  sortBy: 'rate',
  sortOrder: 'desc',
};

export const LOCATIONS_DEFAULT_PARAMS: LocationsSearchParams = {
  page: LOCATIONS_DEFAULT_PAGINATION.page,
  perPage: LOCATIONS_DEFAULT_PAGINATION.perPage,
  sortBy: LOCATIONS_DEFAULT_SORTING.sortBy,
  sortOrder: LOCATIONS_DEFAULT_SORTING.sortOrder,
};
