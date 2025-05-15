import { Edit, FileInput, ImageField, SimpleForm, TextInput } from 'react-admin';

export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" readOnly />
            <TextInput source="name" />
            <TextInput source="description" />
            <FileInput source="categoryImages" label="Resim Yükle" accept="image/png, image/jpeg">
            <ImageField source="src" title="title" />
            </FileInput>

        </SimpleForm>
    </Edit>
);