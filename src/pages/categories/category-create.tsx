import axios from "axios";
import { Create, FileInput, ImageField, SimpleForm, TextInput, useNotify, useRedirect, useRefresh } from "react-admin";

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64String = result.split(",")[1]; // "data:image/jpeg;base64," kısmını atıyoruz
            resolve(base64String);
        };
        reader.onerror = reject;
    });


const CategoryCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const handleSave = async (values: any) => {
        let base64Image = "";

        if (values.categoryImages && values.categoryImages.rawFile) {
            try {
                base64Image = await toBase64(values.categoryImages.rawFile);
            } catch (error) {
                console.error("Resmi Base64'e çevirme hatası:", error);
                notify("Resim işlenirken hata oluştu!", { type: "error" });
                return;
            }
        }

        const categoryData = {
            name: values.name,
            description: values.description,
            imageBase64: base64Image, // Resmi direkt Base64 olarak gönderiyoruz
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}categories`, categoryData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // Eğer JWT token kullanıyorsan
                }
            });
            notify("Kategori başarıyla eklendi!", { type: "success" });
            redirect("/categories");
            refresh();
        } catch (error) {
            console.error("Kategori kaydetme hatası:", error);
            notify("Kategori eklenirken hata oluştu!", { type: "error" });
        }
    };

    return (
        <Create>
            <SimpleForm onSubmit={handleSave}>
                <TextInput source="id" disabled />
                <TextInput source="name" />
                <TextInput source="description" />
                <FileInput source="categoryImages" label="Resim Yükle" accept="image/png, image/jpeg">
                    <ImageField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        </Create>);
}

export default CategoryCreate;