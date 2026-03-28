"use client";

import { ChangeEvent } from "react";
import { REGIONS, LOCATION_TYPES, SORT_OPTIONS } from "@/constants/filters";

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

export default function FilterPanel({
  filters,
  onChange,
}: FilterPanelProps) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "sort") {
      const [sortBy, sortOrder] = value.split("-");
      onChange("sortBy", sortBy);
      onChange("sortOrder", sortOrder);
      return;
    }

    onChange(name, value);
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Пошук"
        value={filters.search}
        onChange={handleChange}
      />

      <select name="region" value={filters.region} onChange={handleChange}>
        <option value="">Усі області</option>
        {REGIONS.map((region) => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </select>

      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">Усі типи</option>
        {LOCATION_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      <select
        name="sort"
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onChange={handleChange}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}