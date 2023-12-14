'use client'

import styles from './page.module.css';
import Map from './components/Map/index';
//import icon from '../public/pngtree-location-marker-png-image_2921053.jpg'
//import dynamic from 'next/dynamic';
//import 'leaflet/dist/leaflet.css';
//import L from 'leaflet';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { getFlats, addressAutocomplete } from './service/geoService';

type Address = {
  id: string;
  detail: string;
  latitude?: number | null;
  longitude?: number | null;
};


export default function Home() {
  //const [addressList, setAddressList] = useState([]);
  const [markers, setMarkers] = useState([]) 
  useEffect(() => {
    const fetchData = async () => {
      const flats = await getFlats();
      
      if (flats) {
        const promises = flats.map(async (flat) => {
          //console.log(flat.address)
          const res = await addressAutocomplete(flat.address)
          flat.geo = res
          return flat
          })
        const newList = await Promise.all(promises)
        //newList.splice(0, newList.length-41)
        //setAddressList(newList)
        //console.log(newList)
        //console.log(flats)
        const newMarkers = newList
            .filter((address) => address.geo && address.geo.length > 0)
            .map((address) => ({
              ...address,
              X: address.geo[0].geometry.coordinates[1],
              Y: address.geo[0].geometry.coordinates[0],
            }))
            .sort((a, b) => b.added_dttm-a.added_dttm)
        setMarkers(newMarkers)
        //console.log(newMarkers)
        }
      }
    fetchData();
    const intervalId = setInterval(fetchData, 5*60*1000);
    return () => clearInterval(intervalId);
  },[])
  
  //console.log(markers)
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <p>This is Flatscatcher</p>
          <Map markers={markers} />
        </div>
        <div>
          {markers.map((address,index) => {
            return (
            <ul key={index}>
              <li>{address.added_dttm}</li>
            </ul>)
          })}
        </div>
      </div>
    </main>
  )
}
