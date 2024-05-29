import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer,TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";

export default function Map()
{
  const navigate = useNavigate();
  const [mapPosition, SetMapPosition] = useState([40, 0]);
  const [searchParams, SetSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");


  return(
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
    <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.mapContainer}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={mapPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>

    </div>
  )
}