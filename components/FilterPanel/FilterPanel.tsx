"use client";

import { ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SORT_OPTIONS } from "@/constants/filters";
import { SEARCH_DEBOUNCE_DELAY } from "@/constants/pagination";
import styles from "./FilterPanel.module.css";
import type { LocationType, Region } from "@/types/categories";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

type Filters = {
  search: string;
  region: string;
  type: string;
  sortBy: string;
  sortOrder: string;
};

type FilterPanelProps = {
  filters: Filters;
  regions: Region[];
  locationTypes: LocationType[];
};

type SelectOption = {
  value: string;
  label: string;
};

export default function FilterPanel({
  filters,
  regions,
  locationTypes,
}: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const debouncedSearchChange = useDebouncedCallback((value: string) => {
    updateQueryParams({ search: value });
  }, SEARCH_DEBOUNCE_DELAY);

  const regionOptions: SelectOption[] = regions.map((item) => ({
    value: item.slug,
    label: item.region,
  }));

  const locationTypeOptions: SelectOption[] = locationTypes.map((item) => ({
    value: item.slug,
    label: item.type,
  }));

  const selectedRegion =
    regionOptions.find((item) => item.value === filters.region) || null;

  const selectedType =
    locationTypeOptions.find((item) => item.value === filters.type) || null;

  const selectedSort =
    SORT_OPTIONS.find(
      (item) => item.value === `${filters.sortBy}-${filters.sortOrder}`,
    ) || null;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearchChange(event.target.value);
  };

  return (
    <div className={styles.panel}>
      <input
        key={filters.search}
        type="text"
        name="search"
        placeholder="Пошук"
        defaultValue={filters.search}
        onChange={handleSearchChange}
        className={styles.input}
      />

      <Select
        className={styles.select}
        classNamePrefix="react-select"
        options={regionOptions}
        value={selectedRegion}
        onChange={(option) =>
          updateQueryParams({
            region: (option as SelectOption | null)?.value || "",
          })
        }
        placeholder="Регіон"
        isClearable
      />

      <Select
        className={styles.select}
        classNamePrefix="react-select"
        options={locationTypeOptions}
        value={selectedType}
        onChange={(option) =>
          updateQueryParams({
            type: (option as SelectOption | null)?.value || "",
          })
        }
        placeholder="Тип локації"
        isClearable
      />

      <Select
        className={styles.select}
        classNamePrefix="react-select"
        options={SORT_OPTIONS}
        value={selectedSort}
        onChange={(option) => {
          const selectedOption = option as SelectOption | null;
          if (!selectedOption) return;

          const [sortBy, sortOrder] = selectedOption.value.split("-");

          updateQueryParams({
            sortBy,
            sortOrder,
          });
        }}
        placeholder="Сортування"
      />
    </div>
  );
}