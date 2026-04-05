'use client';

import { ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { LOCATIONS_SORTING_OPTIONS } from '@/constants/sorting';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants/pagination';
import styles from './FilterPanel.module.css';
import { LocationsSearchParams } from '@/types/location';
import { useQuery } from '@tanstack/react-query';
import { categoriesOptionsClient } from '@/lib/queries/categoriesClient';
import { parseLocationParams } from '@/helpers/parseLocationsParams';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

type FilterPanelProps = {
  initialParams: LocationsSearchParams;
};

type SelectOption = {
  value: string;
  label: string;
};

export default function FilterPanel({ initialParams }: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = parseLocationParams(
    Object.fromEntries(searchParams.entries()),
    initialParams,
  );

  const { data: locationTypes } = useQuery(
    categoriesOptionsClient.locationTypes,
  );
  const { data: regions } = useQuery(categoriesOptionsClient.regions);

  const updateQueryParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const debouncedSearchChange = useDebouncedCallback((value: string) => {
    updateQueryParams({ search: value });
  }, SEARCH_DEBOUNCE_DELAY);

  if (!regions || !locationTypes) return null;

  const regionOptions: SelectOption[] = regions.map((item) => ({
    value: item.slug,
    label: item.region,
  }));

  const locationTypeOptions: SelectOption[] = locationTypes.map((item) => ({
    value: item.slug,
    label: item.type,
  }));

  const selectedRegion =
    regionOptions.find((item) => item.value === currentParams.region) || null;

  const selectedType =
    locationTypeOptions.find((item) => item.value === currentParams.type) ||
    null;

  const selectedSort =
    LOCATIONS_SORTING_OPTIONS.find(
      (item) =>
        item.value === `${currentParams.sortBy}-${currentParams.sortOrder}`,
    ) || null;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearchChange(event.target.value);
  };

  return (
    <div className={styles.panel}>
      <input
        key={currentParams.search}
        type="text"
        name="search"
        placeholder="Пошук"
        defaultValue={currentParams.search}
        onChange={handleSearchChange}
        className={styles.input}
      />

      <div className={styles.filtersGroupBottom}>
        <Select
          className={styles.select}
          classNamePrefix="react-select"
          options={locationTypeOptions}
          value={selectedType}
          onChange={(option) =>
            updateQueryParams({
              type: (option as SelectOption | null)?.value || '',
            })
          }
          placeholder="Тип локації"
          isClearable
        />

        <Select
          className={styles.select}
          classNamePrefix="react-select"
          options={regionOptions}
          value={selectedRegion}
          onChange={(option) =>
            updateQueryParams({
              region: (option as SelectOption | null)?.value || '',
            })
          }
          placeholder="Регіон"
          isClearable
        />

        <div className={styles.sortWrap}>
          <Select
            className={styles.select}
            classNamePrefix="react-select"
            options={LOCATIONS_SORTING_OPTIONS}
            value={selectedSort}
            onChange={(option) => {
              const selectedOption = option as SelectOption | null;
              if (!selectedOption) return;

              const [sortBy, sortOrder] = selectedOption.value.split('-');

              updateQueryParams({
                sortBy,
                sortOrder,
              });
            }}
            placeholder="Сортування"
            controlShouldRenderValue={false}
            isSearchable={false}
          />
        </div>
      </div>
    </div>
  );
}