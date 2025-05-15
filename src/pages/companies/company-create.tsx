import { useEffect, useState } from "react";
import {
    Create,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    useNotify,
    useRedirect,
    useRefresh,
} from "react-admin";
import { Box, Grid, Typography, Paper, Card, CardContent, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import CompanyImageUploader from "../utils/companyImageUploader"; // Importing the custom image uploader
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SocialMediaPopup from "./SocialMediaPopup";

// Marker Icon
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Interactive marker to update form coords
const LocationPicker = () => {
    const { setValue } = useFormContext();
    const [position, setPosition] = useState<[number, number]>([41.0082, 28.9784]);

    useEffect(() => {
        setValue('latitude', position[0].toString());
        setValue('longitude', position[1].toString());
    }, [position, setValue]);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setValue('latitude', lat.toString());
            setValue('longitude', lng.toString());
        },
    });

    return <Marker position={position} icon={customIcon} draggable />;
};

const CompanyCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const handleSuccess = () => {
        notify("Firma başarıyla oluşturuldu", { type: "success" });
        refresh();
        redirect("/companies");
    };

    return (
        <Create mutationOptions={{ onSuccess: handleSuccess }}>
            <Box display="flex" justifyContent="center" mt={4}>
                <Card sx={{ width: 1200, p: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Yeni Firma Oluştur
                        </Typography>
                        <SimpleForm>
                            <CompanyForm />
                        </SimpleForm>
                    </CardContent>
                </Card>
            </Box>
        </Create>
    );
};

const CompanyForm = () => {
    const { setValue, watch } = useFormContext();
    const latitude = watch("latitude");
    const longitude = watch("longitude");

    return (
        <Stack spacing={3}>
            <Typography variant="h6">Firma Bilgileri</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextInput source="name" label="Firma Adı" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextInput source="address" label="Adres" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextInput source="phone" label="Telefon" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextInput source="website" label="Web Sitesi" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <ReferenceInput source="categoryId" reference="categories" label="Kategori">
                        <SelectInput optionText="name" fullWidth />
                    </ReferenceInput>
                </Grid>
                <Grid item xs={6}>
                    <TextInput source="email" label="E-Posta" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextInput source="password" label="Parola" type="password" fullWidth />
                </Grid>
            </Grid>

            <Box mt={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Sosyal Medya Hesapları
                </Typography>
                <SocialMediaPopup setValue={setValue} watch={watch} />
            </Box>

            {/* Firma Görselleri */}
            <Box mt={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Firma Fotoğrafları (Max 2 MB)
                </Typography>
                <CompanyImageUploader
                    onChange={(base64Images) => {
                        setValue("images", base64Images, { shouldValidate: true });
                    }}
                />
            </Box>

            {/* Firma Konumu */}
            <Box mt={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Firma Konumu
                </Typography>
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

            {/* Enlem ve Boylam */}
            <Box mt={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextInput source="latitude" label="Latitude" value={latitude} readOnly fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput source="longitude" label="Longitude" value={longitude} readOnly fullWidth />
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    );
};

export default CompanyCreate;
