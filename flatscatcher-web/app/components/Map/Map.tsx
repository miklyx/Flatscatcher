'use client'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
//import { Icon } from 'leaflet';
import style from '../../page.module.css';

const customIcon = new L.Icon({
  iconUrl: '../../../../map-marker.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

export default function Map({ markers }: { markers: { X: number; Y: number, about: string, url: string }[] }): JSX.Element {
  return (
    <div>
      <MapContainer className={`${style.map} rounded-full`} center={[markers[0]?.X || 52.505247811833314, markers[0]?.Y || 13.467499345820936]} zoom={12} scrollWheelZoom={true}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {markers.map((marker, index) => (
            <Marker key={index} icon={customIcon} position={[marker.X, marker.Y]}>
              <Popup>
                <div><a href={marker.url} target='_blank'>{marker.about}</a></div>
              </Popup>
            </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
