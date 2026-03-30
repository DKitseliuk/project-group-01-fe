"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useCategoriesStore } from "@/lib/store/categoriesStore";
import { fetchLocationTypes, fetchRegions } from "@/lib/api/clientApi";

function initCategories() {
  const { setLocationTypes, setRegions } = useCategoriesStore.getState();
  fetchLocationTypes().then(setLocationTypes);
  fetchRegions().then(setRegions);
}

initCategories();

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}