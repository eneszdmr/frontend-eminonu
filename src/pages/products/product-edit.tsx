import { Edit, FileInput, ImageField, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const ProductEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="productTitle" label="Ürün Adı" />
            <TextInput source="productDescription" label="Açıklama" multiline />
            <NumberInput source="productPrice" label="Fiyat" />
            <FileInput source="productImages" label="Resim Yükle" accept="image/png, image/jpeg">
                <ImageField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);