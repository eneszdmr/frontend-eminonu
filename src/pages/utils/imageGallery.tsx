// ImageGallery.tsx veya içinde tanımladığın yerde
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";
import { useRecordContext } from "react-admin";

const ImageGallery = () => {
    const record = useRecordContext();
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    if (!record?.images || record.images.length === 0) return null;

    const slides = record.images.map((img: any) => ({
        src: `data:image/png;base64,${img.imageBase64}`,
    }));

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Görseller</Typography>
            <Grid container spacing={2}>
                {slides.map((slide, i) => (
                    <Grid item xs={4} key={i}>
                        <Card
                            sx={{ borderRadius: 2, cursor: "pointer" }}
                            onClick={() => {
                                setIndex(i);
                                setOpen(true);
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={slide.src}
                                alt={`Firma Görseli ${i}`}
                                sx={{ objectFit: "contain", height: 200 }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                index={index}
                on={{
                    view: ({ index: currentIndex }) => setIndex(currentIndex),
                }}
            />
        </Box>
    );
};

export default ImageGallery;
