import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    };

    const refreshAccessToken = async () => {
        try {
            const refresh = localStorage.getItem(REFRESH_TOKEN);

            if (!refresh) return false;

            const res = await axios.post("/api/token/refresh/", {
                refresh,
            });

            const newAccess = res.data?.access;

            if (!newAccess) return false;

            localStorage.setItem(ACCESS_TOKEN, newAccess);
            return true;
        } catch {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthenticated(false);
        window.location.href = "/auth333444455555/";
    };

    const checkAuth = async () => {
        const access = localStorage.getItem(ACCESS_TOKEN);

        if (!access) {
            logout();
            return;
        }

        if (!isTokenExpired(access)) {
            setIsAuthenticated(true);
            setLoading(false);
            return;
        }

        const refreshed = await refreshAccessToken();

        if (!refreshed) {
            logout();
            return;
        }

        setIsAuthenticated(true);
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}