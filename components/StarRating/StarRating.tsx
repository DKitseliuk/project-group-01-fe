"use client";

import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import css from "./StarRating.module.css";

const customStyles = {
  itemShapes: Star,
  activeFillColor: "var(--text-primary)",
  inactiveFillColor: "transparent",
  inactiveStrokeColor: "var(--text-primary)",
  activeStrokeColor: "var(--text-primary)",
  itemStrokeWidth: 1.5,
};

interface Props {
  value: number;
  readonly?: boolean;
  onChange?: (rate: number) => void;
}

export default function StarRating({ value, readonly = true, onChange }: Props) {
  return (
    <div className={css.wrapper}>
      <Rating
        value={value}
        readOnly={readonly}
        onChange={onChange}
        itemStyles={customStyles}
        className={css.rating}
      />
    </div>
  );
}