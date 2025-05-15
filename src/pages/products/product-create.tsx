import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    FileInput,
    ImageField,
    useNotify,
    useRedirect,
    useRefresh
} from "react-admin";
import axios from "axios";

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

const ProductCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const handleSave = async (values: any) => {
        let base64Image = "";

        if (values.productImages && values.productImages.rawFile) {
            try {
                base64Image = await toBase64(values.productImages.rawFile);
            } catch (error) {
                console.error("Resmi Base64'e çevirme hatası:", error);
                notify("Resim işlenirken hata oluştu!", { type: "error" });
                return;
            }
        }

        const productData = {
            productTitle: values.productTitle,
            productDescription: values.productDescription,
            productPrice: values.productPrice,
            imageBase64: base64Image, // Resmi direkt Base64 olarak gönderiyoruz
        };

        try {
            await axios.post(`${import.meta.env.REACT_APP_API_URL}products`, productData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // Eğer JWT token kullanıyorsan
                }
            });
            notify("Ürün başarıyla eklendi!", { type: "success" });
            redirect("/products");
            refresh();
        } catch (error) {
            console.error("Ürün kaydetme hatası:", error);
            notify("Ürün eklenirken hata oluştu!", { type: "error" });
        }
    };

    return (
        <Create>
            <SimpleForm onSubmit={handleSave}>
                <TextInput source="productTitle" label="Ürün Adı" />
                <TextInput source="productDescription" label="Açıklama" multiline />
                <NumberInput source="productPrice" label="Fiyat" />
                <FileInput source="productImages" label="Resim Yükle" accept="image/png, image/jpeg">
                    <ImageField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        </Create>
    );
};

export default ProductCreate;
