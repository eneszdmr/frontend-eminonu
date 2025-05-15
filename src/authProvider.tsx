import axios from "axios";
import { AuthProvider } from "react-admin";
import { jwtDecode } from "jwt-decode";



interface Token {
    sub: string;  // Subject, typically user identifier
    role: string[]; // Role or roles of the user
    iat: number;   // Issued at
    exp: number;   // Expiration time
}

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}users/login`, null, {
                params: { email: username, password: password },
                headers: { "Content-Type": "application/json" },
            });

            const { token } = response.data;

            localStorage.removeItem("token");

            // Token'ı localStorage'a kaydet
            localStorage.setItem("token", token);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject("Giriş Başarısız !");
        }
    },
    logout: async () => {
        try {

            const token = localStorage.getItem("token");

            if (token) {
                // Backend'e logout isteği gönder
                await axios.post(`${import.meta.env.VITE_API_URL}users/logout`, {}, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            }

            // Tarayıcıdan token'ı kaldır
            localStorage.removeItem("token");
            return Promise.resolve();
        } catch (error) {
            console.error("Logout failed:", error);
            return Promise.reject("Logout failed");
        }
    },
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("token");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        return Promise.resolve();
    },
    canAccess: async ({ resource, action }) => {
        const token = localStorage.getItem("token") ?? "";
        const decoded: Token = jwtDecode<Token>(token);
        const roles = decoded.role[0];

        if (roles === "ADMIN") {
            return true;
        }

        if (roles === "FIRMA") {
            if (resource === "companies") {
                return action === "show" || action === "list";
            }
            if (resource === "products") {
                return true;
            }
            return false;

        }
        return false;
    },
};
