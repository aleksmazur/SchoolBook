import { useRef, useState, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const map = useRef<maplibregl.Map | null>(null);
  const [lng] = useState(27.605179862565443);
  const [lat] = useState(53.85285127869591);
  const [API_KEY] = useState('cxyywrCy8jX33A6P7CGo');

  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current !== null) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/4e7ef975-e6fc-4243-b48c-4e34e2e846df/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: 16,
      });
      map.current.addControl(new maplibregl.NavigationControl({}), 'top-right');
      new maplibregl.Marker({ color: '#FF0000' }).setLngLat([lng, lat]).addTo(map.current);
    }
  });
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
