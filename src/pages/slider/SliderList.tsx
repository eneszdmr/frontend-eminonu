import { List, Datagrid, TextField, ImageField, EditButton } from "react-admin";

export const SliderList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Başlık" />
            <TextField source="description" label="Açıklama" />
            <TextField source="orderIndex" label="Sıra" />
            <ImageField source="imageBase64" label="Resim" />
            <EditButton />
        </Datagrid>
    </List>
);
