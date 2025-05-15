import { Datagrid, List, TextField } from "react-admin";

const UserList = () => {
    return (<List>

        <Datagrid>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="roles" />



        </Datagrid>
    </List>
    );
}
export default UserList;