import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
} from '@mui/material';
import { Facebook, Twitter, Instagram, WhatsApp, YouTube, MusicNote } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

const socialMediaFields = [
    { name: 'facebook', label: 'Facebook', icon: <Facebook /> },
    { name: 'twitter', label: 'Twitter', icon: <Twitter /> },
    { name: 'instagram', label: 'Instagram', icon: <Instagram /> },
    { name: 'whatsapp', label: 'WhatsApp', icon: <WhatsApp /> },
    { name: 'youtube', label: 'YouTube', icon: <YouTube /> },
    { name: 'tiktok', label: 'TikTok', icon: <MusicNote /> },
];

const SocialMediaPopup: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { setValue, watch } = useFormContext(); // 🔥 Burada hook kullanımı doğru oldu

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Sosyal Medya Hesapları
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Sosyal Medya Hesapları</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} mt={1}>
                        {socialMediaFields.map(({ name, label, icon }) => (
                            <Grid item xs={12} sm={6} key={name}>
                                <TextField
                                    label={
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {icon}
                                            {label}
                                        </span>
                                    }
                                    fullWidth
                                    value={watch(name) || ''}
                                    onChange={(e) => setValue(name, e.target.value, { shouldDirty: true })}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SocialMediaPopup;
