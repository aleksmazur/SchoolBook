import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import './schoolInfoPage.css';
import 'maplibre-gl/dist/maplibre-gl.css';

const SchoolInfoPage = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const map = useRef<maplibregl.Map | null>(null);
  const [lng] = useState(27.49051816377847);
  const [lat] = useState(53.896431852742886);
  const [API_KEY] = useState('cxyywrCy8jX33A6P7CGo');

  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current !== null) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/4e7ef975-e6fc-4243-b48c-4e34e2e846df/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: 14,
      });
      map.current.addControl(new maplibregl.NavigationControl({}), 'top-right');
      new maplibregl.Marker({ color: '#FF0000' }).setLngLat([lng, lat]).addTo(map.current);
    }
  });

  return (
    <div>
      <h2>О школе</h2>
      <div className="school__info">
        <h2>Гимназия № 1 г. Минск</h2>
        <div>Адрес: 220000, г. Минск, улица Мира, 1</div>
        <div>Телефон: +375 214 52-32-61 (приёмная)</div>
        <div>E-mail: gimn1@edum.by</div>
      </div>
      <div className="map-wrap">
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
};

export default SchoolInfoPage;
