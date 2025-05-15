import { NumberField, Show, SimpleShowLayout, TextField, useRecordContext } from "react-admin";

// Base64'e çevrilen resim bileşeni
const Base64ImageField = ({ source }: { source: string }) => {
    const record = useRecordContext();
    if (!record || !record[source]) return null;

    const base64String = `data:image/png;base64,${record[source]}`;

    return <img src={base64String} alt="Ürün Görseli" style={{ maxWidth: "200px", height: "auto" }} />;
};

export const ProductShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="productTitle" label="Ürün Adı" />
            <TextField source="productDescription" label="Açıklama" />
            <NumberField source="productPrice" label="Fiyat" />

            {/* Özel Base64 resim bileşeni */}
            <Base64ImageField source="productImage" label="Görsel" />
        </SimpleShowLayout>
    </Show>
);
