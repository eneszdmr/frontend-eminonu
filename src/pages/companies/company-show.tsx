import {
    EmailField,
    Labeled,
    Show,
    SimpleShowLayout,
    TextField,
    useRecordContext
} from 'react-admin';
import { Box, Typography, Grid } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import ImageGallery from '../utils/imageGallery';

const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapField = () => {
    const record = useRecordContext();
    if (!record?.latitude || !record?.longitude) return null;

    return (
        <Box sx={{ height: 400, mt: 4, borderRadius: 2, overflow: 'hidden' }}>
            <MapContainer
                center={[parseFloat(record.latitude), parseFloat(record.longitude)]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[parseFloat(record.latitude), parseFloat(record.longitude)]} icon={customIcon}>
                    <Popup>{record.name}</Popup>
                </Marker>
            </MapContainer>
        </Box>
    );
};



export const CompanyShow = () => (
    <Show>
        <SimpleShowLayout>
            <Box sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>Firma Bilgileri</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <Labeled label="Firma Kodu"><TextField source="id" label="Firma Kodu" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Firma Adı"><TextField source="name" label="Firma Adı" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Adres"><TextField source="address" label="Adres" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Telefon"><TextField source="phone" label="Telefon" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Website"><TextField source="website" label="Website" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Kategori"><TextField source="categoryName" label="Kategori" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Email"><EmailField source="email" label="Email" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Facebook"><TextField source="facebook" label="facebook" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Whatsapp"><TextField source="whatsapp" /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Instagram"><TextField source="instagram"  /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Youtube"><TextField source="youtube"  /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Tiktok"><TextField source="tiktok"  /></Labeled></Grid>
                    <Grid item xs={6}>  <Labeled label="Twitter"><TextField source="twitter"  /></Labeled></Grid>
                    



                    <Grid item xs={6}><TextField source="latitude" label="Latitude"style={{ display: "none" }} /></Grid>
                    <Grid item xs={6}><TextField source="longitude" label="Longitude" style={{ display: "none" }} /></Grid>
                    <Grid item xs={6}>  <TextField source="password" label="Şifre" style={{ display: "none" }} /></Grid>
                </Grid>
                {/* Görsel Galerisi */}
                <ImageGallery />
                
                {/* Harita */}
                <MapField />

                
            </Box>
        </SimpleShowLayout>
    </Show>
);
