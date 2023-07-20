import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MarkerIcon } from "./react-leaflet-icon.js";
import axios from "axios";
import styles from '../estilos/general.module.css'

const LocalizacionInicial = [21.04845, -86.84675];

const ObtenerMapa = () => {
  const [Localizacion, setLocalizacion] = useState(LocalizacionInicial);
  const [LugarNombre, setLugarNombre] = useState("");

  useEffect(() => {
    const fetchLugarNombre = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${Localizacion[0]}&lon=${Localizacion[1]}&format=json`
        );
        const lugar = response.data.display_name;
        setLugarNombre(lugar);
      } catch (error) {
        console.error("Error al obtener el nombre del lugar:", error);
      }
    };

    fetchLugarNombre();
  }, [Localizacion]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLocalizacion([lat, lng]);
  };

  return (
    <MapContainer className={styles.mapa}
      center={Localizacion}
      zoom={13}
        onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={Localizacion} icon={MarkerIcon}>
        <Popup>
          <strong>{LugarNombre || "Ubicación desconocida"}</strong>
          <br />
          Latitud: {Localizacion[0].toFixed(6)}, Longitud:{" "}
          {Localizacion[1].toFixed(6)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ObtenerMapa;
