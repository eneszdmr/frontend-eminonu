import { Datagrid, TextField, EditButton, List } from 'react-admin';

export const CommentsList = () => {


    return (<List>

        <Datagrid>

            <TextField source="id" />
            <TextField source="text" />
            <TextField source="company_id" />
            <TextField source="user_id" />
            <TextField source="rating" />
            <EditButton />
        </Datagrid>
    </List>
    );
};