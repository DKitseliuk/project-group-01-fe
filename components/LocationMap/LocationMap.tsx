'use client';

import css from './LocationMap.module.css';

interface Props {
  region: string;
  locationName: string;
}

export default function LocationMap({ region, locationName }: Props) {
 const query = encodeURIComponent(`${locationName}, ${region}`)

  return (
    <iframe
      title={locationName}
      className={css.map}
      src={`https://maps.google.com/maps?q=${query}&output=embed`}
      allowFullScreen
    />
  );
}