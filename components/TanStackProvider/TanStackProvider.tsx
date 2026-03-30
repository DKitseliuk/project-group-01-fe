"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useCategoriesStore } from "@/lib/store/categoriesStore";
import { fetchLocationTypes, fetchRegions } from "@/lib/api/clientApi";

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => new QueryClient());
  const setLocationTypes = useCategoriesStore(state => state.setLocationTypes);
  const setRegions = useCategoriesStore(state => state.setRegions);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    fetchLocationTypes().then(setLocationTypes);
    fetchRegions().then(setRegions);
  });

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}