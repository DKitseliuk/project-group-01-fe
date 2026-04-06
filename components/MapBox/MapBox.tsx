'use client';

import styles from './MapBox.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Map, { MapRef, Marker } from 'react-map-gl/mapbox';
import { SearchBox } from '@mapbox/search-js-react';
import { Coordinates } from '@/types/map';
import { useState } from 'react';
import { DEFAULT_ZOOM } from '@/constants/map';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type MapBoxProps = {
  coordinates: Coordinates;
  setCoordinates?: (coords: Coordinates) => void;
};

const MapBox = ({ coordinates, setCoordinates }: MapBoxProps) => {
  const canDrag = !!setCoordinates;
  const [mapInstance, setMapInstance] = useState<MapRef | null>(null);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={styles.wrapper}>
      {canDrag && (
        <div className={styles.inputWrapper}>
          <SearchBox
            accessToken={MAPBOX_TOKEN!}
            map={mapInstance?.getMap()}
            mapboxgl={mapboxgl}
            value={searchValue}
            onChange={setSearchValue}
            onRetrieve={(result) => {
              const [lon, lat] = result.features[0].geometry.coordinates;
              setCoordinates?.({ lat, lon });
              setSearchValue('');
            }}
            placeholder="Введіть назву місця"
          />
        </div>
      )}
      <div className={styles.mapWrapper}>
        <Map
          ref={setMapInstance}
          mapboxAccessToken={MAPBOX_TOKEN}
          language="uk"
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            zoom: DEFAULT_ZOOM,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/standard"
          onClick={({ lngLat }) =>
            setCoordinates?.({ lat: lngLat.lat, lon: lngLat.lng })
          }
        >
          <Marker
            longitude={coordinates.lon}
            latitude={coordinates.lat}
            draggable={canDrag}
            onDrag={({ lngLat }) =>
              setCoordinates?.({ lat: lngLat.lat, lon: lngLat.lng })
            }
          ></Marker>
        </Map>
      </div>
    </div>
  );
};

export default MapBox;
