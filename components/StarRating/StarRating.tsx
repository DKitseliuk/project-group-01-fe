"use client";

import dynamic from "next/dynamic";

const Rating = dynamic(
  () => import("react-simple-star-rating").then((m) => m.Rating),
  { ssr: false }
);

interface Props {
  value: number;
  readonly?: boolean;
  size?: number;
  onChange?: (rate: number) => void;
}

export default function StarRating({
  value,
  readonly = true,
  size = 20,
  onChange,
}: Props) {
  return (
    <Rating
      key={value}
      initialValue={value}
      readonly={readonly}
      size={size}
      allowFraction
      onClick={onChange}
      fillColor="black"
      emptyColor="transparent"
      SVGstrokeColor="black"
      SVGstrokeWidth={2}
    />
  );
}