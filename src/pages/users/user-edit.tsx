import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" readOnly />
            <TextInput source="email" />
            <TextInput source="password" />
            <TextInput source="roles" />
        </SimpleForm>
    </Edit>
);