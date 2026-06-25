import { ACCESS_TOKEN } from "../constants";

export const isLoggedIn = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT

        const currentTime = Date.now() / 1000; // in seconds

        if (payload.exp < currentTime) {
            return false; // expired
        }

        return true; // valid
    } catch (error) {
        return false; // invalid token
    }
};