import {
  LocationsSearchParams,
  LocationsSearchParamsURL,
} from '@/types/location';

export const parseLocationParams = (
  raw: LocationsSearchParamsURL,
  defaults: LocationsSearchParams,
): LocationsSearchParams => ({
  ...defaults,
  ...raw,
  page: raw.page ? Number(raw.page) : defaults.page,
  perPage: raw.perPage ? Number(raw.perPage) : defaults.perPage,
});
