import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { TextInput, useRecordContext, useNotify } from "react-admin";
import { useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Close";

const MAX_FILE_SIZE_MB = 2;

const CompanyImageUploader = () => {
    const { setValue } = useFormContext();
    const record = useRecordContext();
    const notify = useNotify();

    const [previews, setPreviews] = useState<string[]>([]);
    const [imagesData, setImagesData] = useState<{ imageBase64: string }[]>([]);

    // Mevcut görselleri ilk yüklemede set et
    useEffect(() => {
        if (record?.images?.length > 0) {
            const existingBase64 = record.images.map((img: any) => img.imageBase64);
            setImagesData(existingBase64.map(base64 => ({ imageBase64: base64 })));
            setPreviews(existingBase64.map(base64 => `data:image/jpeg;base64,${base64}`));
        }
    }, [record]);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        
        const validFiles = files.filter(file => {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                notify(`${file.name} dosyası çok büyük. Maksimum boyut ${MAX_FILE_SIZE_MB}MB.`, { type: 'warning' });
                return false;
            }
            return true;
        });

        const base64Images = await Promise.all(
            validFiles.map(file => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })
        );

        const newImageObjects = base64Images.map(base64 => ({
            imageBase64: base64.split(",")[1],
        }));

        setImagesData(prev => {
            const updated = [...prev, ...newImageObjects];
            setValue("images", updated, { shouldDirty: true });
            return updated;
        });

        setPreviews(prev => [...prev, ...base64Images]);
    };

    const handleDelete = (index: number) => {
        const updatedPreviews = previews.filter((_, i) => i !== index);
        const updatedImagesData = imagesData.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        setImagesData(updatedImagesData);
        setValue("images", updatedImagesData, { shouldDirty: true });
    };

    return (
        <Box sx={{ mt: 2 }}>
           
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                {previews.map((src, index) => (
                    <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                        <img
                            src={src}
                            alt={`Preview ${index}`}
                            style={{ maxWidth: 150, maxHeight: 100, borderRadius: 8 }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: "absolute",
                                top: -8,
                                right: -8,
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                zIndex: 1
                            }}
                            onClick={() => handleDelete(index)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>
            <TextInput source="images" style={{ display: "none" }} />
        </Box>
    );
};

export default CompanyImageUploader;
