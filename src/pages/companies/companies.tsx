import {
    Datagrid,
    List,
    TextField,
    TextInput,
    EmailField,
    UrlField,
} from 'react-admin';

export const CompanyList = () => {
    const companyFilters = [
        <TextInput source="name" label="Firma Ara" alwaysOn fullWidth />,
    ];

    return (
        <List filters={companyFilters} title="Firmalar" perPage={10} sort={{ field: 'name', order: 'ASC' }}>
            <Datagrid
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 2,
                    overflow: 'hidden',
                    '& .RaDatagrid-headerCell': {
                        fontWeight: 'bold',
                        backgroundColor: '#f5f5f5',
                        padding: '16px',
                        fontSize: '0.95rem',
                        color: '#333',
                    },
                    '& .RaDatagrid-rowCell': {
                        padding: '14px',
                        borderBottom: '1px solid #eee',
                    },
                    '& .RaDatagrid-row:hover': {
                        backgroundColor: '#f0f8ff',
                    },
                }}
                rowClick="show"
            >
                <TextField source="name" label="Firma Adı" />
                <TextField source="address" label="Adres" />
                <TextField source="phone" label="Telefon" />
                <UrlField source="website" label="Web Sitesi" />
                <TextField source="categoryName" label="Kategori" />
                <EmailField source="email" label="E-Posta" />
             {/* <EditButton label="Düzenle" /> */}
            </Datagrid>
        </List>
    );
};
