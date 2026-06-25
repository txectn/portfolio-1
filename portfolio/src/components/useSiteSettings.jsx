import { useEffect, useState } from "react";
import { getData } from "../services/methods";

let siteSettingsCache = null;

export function useSiteSettings() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchSettings = async () => {
            if (siteSettingsCache) {
                setSettings(siteSettingsCache);
                applySiteSettings(siteSettingsCache);
                return;
            }

            const res = await getData({
                path: "/api/site-settings",
                isAuth: false,
            });

            const data = res?.data?.[0];

            if (!data) return;

            siteSettingsCache = data;

            if (isMounted) {
                setSettings(data);
                applySiteSettings(data);
            }
        };

        fetchSettings();

        return () => {
            isMounted = false;
        };
    }, []);

    return settings;
}

function applySiteSettings(data) {
    if (data?.favicon) {
        let link = document.querySelector("link[rel='icon']");

        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }

        link.href = data.favicon;
    }

    if (data?.site_name) {
        document.title = data.site_name;
    }
}

export function useLogo() {
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchLogo = async () => {
            if (siteSettingsCache?.logo && siteSettingsCache?.site_name) {
                setLogo({
                    logo: siteSettingsCache.logo,
                    site_name: siteSettingsCache.site_name,
                });
                return;
            }

            const res = await getData({
                path: "api/site-settings",
                isAuth: false,
            });

            const data = res?.data?.[0];

            if (!data) return;

            siteSettingsCache = data;

            if (isMounted) {
                setLogo({
                    logo: data.logo,
                    site_name: data.site_name,
                });
            }
        };

        fetchLogo();

        return () => {
            isMounted = false;
        };
    }, []);

    return logo;
}