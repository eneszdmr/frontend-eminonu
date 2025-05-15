import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

interface MapInputProps {
    onChange: (location: { latitude: number; longitude: number }) => void;
}

const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const MapInput: React.FC<MapInputProps> = ({ onChange }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    function MapClickHandler() {
        useMapEvents({
            click(e) {

                const { lat, lng } = e.latlng;

                setPosition([lat, lng]);
                onChange({ latitude: lat, longitude: lng });
            },
        });
        return null;
    }


    return (
        <MapContainer center={[41.0082, 28.9784]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && <Marker position={position} icon={customIcon} />}
            <MapClickHandler />
        </MapContainer>
    );
};

export default MapInput;
