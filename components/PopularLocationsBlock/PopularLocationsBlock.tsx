"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/navigation";

import css from "./PopularLocations.module.css";
import { fetchPopularLocations } from "@/lib/api/clientApi";
import type { Location } from "@/types/location";
import LocationCard from "@/components/LocationCard/LocationCard";

export default function PopularLocationsBlock() {
  const { data: locations = [], isLoading, isError } = useQuery<Location[]>({
    queryKey: ["popularLocations"],
    queryFn: fetchPopularLocations,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading locations</p>;

  const topLocations = [...locations]
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 6);

  return (
    <section className={css.section}>
      <h2 className={css.title}>Популярні локації</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {topLocations.map((location) => (
          <SwiperSlide key={location._id}>
            <LocationCard location={location} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
// export default function PopularLocations() {
//   const locations = [1, 2, 3];

//   return (
//     <section>
//       <h2>Популярні локації</h2>

//       <div>
//         {locations.map((item) => (
//           <div key={item}>Тестова локація {item}</div>
//         ))}
//       </div>
//     </section>
//   );
// }