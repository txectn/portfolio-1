import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { useState, useEffect } from "react";
import { postData } from "../../services/methods";
import { isLoggedIn } from "../../components/isLogin";
import styles from "./auth.module.css";

function Auth() {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isLoggedIn()) {
            window.location.href = "/site-settings/";
        }
    }, []);

    const login = async () => {
        const result = await postData({
            path: "/api/auth/",
            data: formData,
        });

        console.log(result);

        if (!result?.success) {
            alert("Login failed. Please try again.");
            return;
        }

        if (result?.data?.access) {
            localStorage.setItem(ACCESS_TOKEN, result.data.access);
        }

        if (result?.data?.refresh) {
            localStorage.setItem(REFRESH_TOKEN, result.data.refresh);
        }
        if (result?.success) {
            window.location.href = "/site-settings/";
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className={`layout-wrapper ${styles.container}`}>
            <div className={`title layout ${styles.title}`}>
                Login to Site Settings
            </div>
            <div className={`layout ${styles.form}`}>
                <input
                    type="text"
                    placeholder="username..."
                    value={formData.username || ""}
                    className={styles.input}
                    onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            username: e.target.value,
                        }));
                    }}
                />

                <input
                    type="password"
                    placeholder="password..."
                    value={formData.password || ""}
                    className={styles.input}
                    onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }));
                    }}
                />

                <button onClick={login} className={styles.button}>Login</button>
            </div>
        </div>
    );
}

export default Auth;