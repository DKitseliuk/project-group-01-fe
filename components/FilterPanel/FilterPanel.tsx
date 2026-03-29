"use client";

import { ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { useDebouncedCallback } from "use-debounce";
import { REGIONS, LOCATION_TYPES, SORT_OPTIONS } from "@/constants/filters";
import styles from "./FilterPanel.module.css";

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
  onChange: (name: string, value: string) => void;
};

type SelectOption = {
  value: string;
  label: string;
};

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const debouncedSearchChange = useDebouncedCallback((value: string) => {
    onChange("search", value);
  }, 500);

  const selectedRegion =
    REGIONS.find((item) => item.value === filters.region) || null;

  const selectedType =
    LOCATION_TYPES.find((item) => item.value === filters.type) || null;

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
        options={REGIONS}
        value={selectedRegion}
        onChange={(option) =>
          onChange("region", (option as SelectOption | null)?.value || "")
        }
        placeholder="Регіон"
        isClearable
      />

      <Select
        className={styles.select}
        classNamePrefix="react-select"
        options={LOCATION_TYPES}
        value={selectedType}
        onChange={(option) =>
          onChange("type", (option as SelectOption | null)?.value || "")
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
          onChange("sortBy", sortBy);
          onChange("sortOrder", sortOrder);
        }}
        placeholder="Сортування"
      />
    </div>
  );
}
