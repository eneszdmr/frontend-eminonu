import { Datagrid, List, TextField } from "react-admin";

const CategoryList = () => {
    return (<List>

        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" label="Kategori Detayı" />


        </Datagrid>
    </List>
    );
}
export default CategoryList;