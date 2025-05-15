import axios from "axios"
import { DataProvider } from "react-admin";

const API_URL = "https://rehbereminonu1-dba5ang9e3gcd0gs.canadacentral-01.azurewebsites.net/api";

//const API_URL = "http://localhost:8081/api"; // Localhost için API URL'si



const createAxiosInstance = () => {
    const token = localStorage.getItem("token"); // Her istek öncesi token'ı alıyoruz
    return axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
        },
    });
};
const dataProvider: DataProvider = {
    getList: async (resource) => {
        const axiosInstance = createAxiosInstance();
        try {

            const response = await axiosInstance.get(`/${resource}`);


            return {
                data: response.data,
                total: response.data.length, // Adjust this if your API provides a total count
            };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Error fetching data");
        }
    },
    getOne: async (resource, params) => {
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.get(`/${resource}/${params.id}`);
            return { data: response.data };

        } catch (error) {
            console.error("Error fetching single record:", error);
            throw new Error("Error fetching single record");
        }
    },
    create: async (resource, params) => {

        try {
            const axiosInstance = createAxiosInstance();

            const response = await axiosInstance.post(`/${resource}`, params.data);
            return { data: response.data };
        } catch (error) {
            console.error("Error creating record:", error);
            throw new Error("Error creating record");
        }
    },
    update: async (resource, params) => {
        try {

            const axiosInstance = createAxiosInstance();

            const response = await axiosInstance.put(`/${resource}/${params.id}`, params.data);
            return { data: response.data };
        } catch (error) {
            console.error("Error updating record:", error);
            throw new Error("Error updating record");
        }
    },
    delete: async (resource, params) => {
        try {
            const axiosInstance = createAxiosInstance();
            await axiosInstance.delete(`/${resource}/${params.id}`);
            return { data: { id: params.id } }
        } catch (error) {
            console.error("Error deleting record:", error);
            throw new Error("Error deleting record");
        }
    },
    deleteMany: async (resource, params) => {
        try {
            const axiosInstance = createAxiosInstance();

            await Promise.all(params.ids.map(id =>
                axiosInstance.delete(`/${resource}/${id}`)
            ));
            return { data: params.ids };
        } catch (error) {
            console.error("Error deleting record:", error);
            throw new Error("Error deleting record");
        }

    },
    getMany: async (resource, params) => {
        try {
            const axiosInstance = createAxiosInstance();
            const responses = await Promise.all(
                params.ids.map(id => axiosInstance.get(`/${resource}/${id}`))
            );

            return { data: responses.map(res => res.data) };
        } catch (error) {
            console.error("getMany Hatası:", error);
            throw new Error("getMany Hatası");
        }
    },

};

export default dataProvider;