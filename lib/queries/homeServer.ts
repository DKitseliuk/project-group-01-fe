import { queryOptions } from '@tanstack/react-query';
import { fetchLocations } from '../api/serverApi';

export const homeOptionsServer = {
  popularLocations: queryOptions({
    queryKey: ['popularLocations'],
    queryFn: () =>
      fetchLocations({
        page: 1,
        perPage: 9,
        sortBy: 'rate',
        sortOrder: 'desc',
      }),
  }),
};
