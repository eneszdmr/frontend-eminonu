import { TextInput, NumberInput,required } from "react-admin";
import { useWatch, useFormContext } from "react-hook-form";



export const SliderForm = () => {
    const { setValue } = useFormContext();
    const imageBase64 = useWatch({ name: "imageBase64" });

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("imageBase64", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <TextInput source="name" label="Başlık" fullWidth validate={[required()]} />
            <TextInput source="description" label="Açıklama" fullWidth multiline validate={[required()]} />
            <NumberInput source="orderIndex" label="Sıra" validate={[required()]} />
            
            
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageBase64 && (
                <img
                    src={imageBase64}
                    alt="Önizleme"
                    style={{ marginTop: 10, maxWidth: 300, maxHeight: 150, borderRadius: 8 }}
                />
            )}
            <TextInput source="imageBase64" style={{ display: "none" }} />
        </>
    );
};
