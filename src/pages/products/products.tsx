import { Datagrid, ImageField, List, NumberField, TextField } from "react-admin";

const ProductList = () => {
    return (<List>

        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="productTitle" label="Ürün Adı" />
            <TextField source="productDescription" label="Açıklama" />
            <NumberField source="productPrice" label="Fiyat" />
            <ImageField source="productImages" label="Görsel" />
        </Datagrid>
    </List>
    );
}
export default ProductList;