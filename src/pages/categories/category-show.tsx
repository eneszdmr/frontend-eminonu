

import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';



const Base64ImageField = ({ source }: { source: string }) => {
    const record = useRecordContext();
    if (!record || !record[source]) return null;

    const base64String = `data:image/png;base64,${record[source]}`;

    return <img src={base64String} alt="Kategori Görseli" style={{ maxWidth: "200px", height: "auto" }} />;
};

export const CategoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <Base64ImageField source="categoryImage" label="Görsel" />

        </SimpleShowLayout>
    </Show>
);