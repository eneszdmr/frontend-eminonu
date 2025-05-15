import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="roles" />
            <TextField source="password" />

        </SimpleShowLayout>
    </Show>
);