import {
    Edit,
    ReferenceInput,
    SaveButton,
    SelectInput,
    SimpleForm,
    TextInput,
    Toolbar,
    useRecordContext,
} from 'react-admin';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useFormContext } from 'react-hook-form';
import { Box, Grid, Typography, Paper } from '@mui/material';
import CompanyImageUploader from '../utils/companyImageUploader';
import SocialMediaPopup from './SocialMediaPopup';

// Marker Icon
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Interactive marker to update form coords
const LocationPicker = () => {
    const record = useRecordContext();
    const { setValue } = useFormContext();

    const initialLat = record?.latitude ? parseFloat(record.latitude) : 41.0082;
    const initialLng = record?.longitude ? parseFloat(record.longitude) : 28.9784;

    const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);

    useEffect(() => {
        setValue('latitude', position[0].toString(), { shouldDirty: true });
        setValue('longitude', position[1].toString(), { shouldDirty: true });
    }, [position, setValue]);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setValue('latitude', lat.toString(), { shouldDirty: true });
            setValue('longitude', lng.toString(), { shouldDirty: true });
        },
    });

    return <Marker position={position} icon={customIcon} draggable />;
};

const FixedToolbar = () => (
    <Toolbar
        sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#fff',
            zIndex: 1100,
            borderTop: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'flex-end',
            py: 0,
            px: 3,
        }}
    >
        <SaveButton />
    </Toolbar>
);


// Main Edit Form
export const CompanyEdit = () => (
    <Edit>
        <SimpleForm toolbar={<FixedToolbar />}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>Firma Bilgileri</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}><TextInput source="id" label="Firma Kodu" disabled fullWidth /></Grid>
                    <Grid item xs={6}><TextInput source="name" label="Firma Adı" fullWidth /></Grid>
                    <Grid item xs={6}><TextInput source="address" label="Adres" fullWidth /></Grid>
                    <Grid item xs={6}><TextInput source="phone" label="Telefon" fullWidth /></Grid>
                    <Grid item xs={6}><TextInput source="website" label="Website" fullWidth /></Grid>
                    <Grid item xs={6}>
                        <ReferenceInput source="categoryId" reference="categories" label="Kategori">
                            <SelectInput optionText="name" fullWidth />
                        </ReferenceInput>
                    </Grid>
                    <Grid item xs={6}><TextInput source="email" label="Email" fullWidth /></Grid>
                    <Grid item xs={6}><TextInput source="password" label="Şifre" fullWidth /></Grid>
                    <Grid item xs={6}><TextInput source="latitude" label="Latitude" style={{ display: "none" }} /></Grid>
                    <Grid item xs={6}><TextInput source="longitude" label="Longitude" style={{ display: "none" }} /></Grid>
                    <TextInput source="images" style={{ display: 'none' }} />
                </Grid>
                <Box mt={3}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Sosyal Medya Hesapları
                    </Typography>
                    <SocialMediaPopup />
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>Firma Görselleri</Typography>
                    <CompanyImageUploader />
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>Firma Konumu</Typography>
                    <Paper elevation={3} sx={{ height: 400, borderRadius: 2, overflow: 'hidden' }}>
                        <MapContainer
                            center={[41.0082, 28.9784]}
                            zoom={15}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap contributors'
                            />
                            <LocationPicker />
                        </MapContainer>
                    </Paper>
                </Box>


            </Box>
        </SimpleForm>
    </Edit>
);
