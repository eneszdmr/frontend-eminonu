import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { CompanyList } from "./pages/companies/companies";
import UserList from "./pages/users/user-list";
import { CompanyShow } from "./pages/companies/company-show";
import { CompanyEdit } from "./pages/companies/company-edit";
import { UserShow } from "./pages/users/user-show";
import { UserEdit } from "./pages/users/user-edit";
import CompanyCreate from "./pages/companies/company-create";
import PersonIcon from '@mui/icons-material/Person';
import companyIcon from '@mui/icons-material/Store';
import categoryIcon from '@mui/icons-material/Category';
import ProductIcon from '@mui/icons-material/ImageOutlined';
import commentIcon from '@mui/icons-material/Comment';
import "leaflet/dist/leaflet.css";
import HomePage from "./pages/homepage";
import { authProvider } from "./authProvider";

import { CategoryShow } from "./pages/categories/category-show";

import { CommentsList } from "./pages/comments/comments";
import CategoryList from "./pages/categories/categories";
import CategoryCreate from "./pages/categories/category-create";
import { CategoryEdit } from "./pages/categories/category-edit";
import turkishMessages from "./pages/turkishmessages";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import ProductList from "./pages/products/products";
import { ProductShow } from "./pages/products/product-show";
import { ProductEdit } from "./pages/products/product-edit";
import ProductCreate from "./pages/products/product-create";
import { SliderList } from "./pages/slider/SliderList";
import SliderCreate from "./pages/slider/SliderCreate";
import SliderEdit from "./pages/slider/SliderEdit";

const i18nProvider = polyglotI18nProvider(() => turkishMessages, 'tr');
export const App = () =>

    <Admin
        layout={Layout}
        dataProvider={dataProvider}
        dashboard={HomePage}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        requireAuth
    >
        <Resource
            name="companies"
            icon={companyIcon}
            list={CompanyList}
            show={CompanyShow}
            edit={CompanyEdit}
            create={CompanyCreate}
            options={{ label: "Firmalar" }} // Custom label
        />

        <Resource
            icon={PersonIcon}
            name="users"
            list={UserList}
            show={UserShow}
            edit={UserEdit}

        />
        <Resource
            name="categories"
            icon={categoryIcon}
            list={CategoryList}
            show={CategoryShow}
            edit={CategoryEdit}
            create={CategoryCreate}
        />
        <Resource
            name="products"
            icon={ProductIcon}
            list={ProductList}
            show={ProductShow}
            edit={ProductEdit}
            create={ProductCreate}
        />
        <Resource
            name="comments"
            icon={commentIcon}
            list={CommentsList}
        />

    <Resource
        name="sliders"
         list={SliderList}
         create={SliderCreate}
         edit={SliderEdit}
/>

    </Admin>

