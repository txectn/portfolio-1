import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../sidebar/sidebar";
import styles from "./header.module.css"
import { useLogo } from "../useSiteSettings"
import { MenuIcon, SunIcon } from "../../assets/svg/icons";
import { THEME_MODE } from "../../constants";
import { handleScrollTop } from "../scrollTop";
function Header() {
    const sidebarRef = useRef(null);
    const navRef = useRef(null);

    const logoData = useLogo();

    const [mainHeaderShadow, setMainHeaderShadow] = useState(false);

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem(THEME_MODE) || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_MODE, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        let last = false;

        const handleScroll = () => {
            const showShadow = window.scrollY > 47;

            if (showShadow !== last) {
                last = showShadow;
                setMainHeaderShadow(showShadow);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        {
            navLink: "/",
            navTitle: "Home"
        },
        {
            navLink: "/projects",
            navTitle: "Projects"
        },
        {
            navLink: "/services",
            navTitle: "Services"
        },
        {
            navLink: "/about",
            navTitle: "About"
        },
        {
            navLink: "/contact",
            navTitle: "Contact"
        },
    ]

    const nav = (className) => {
        return (
            <div className={`${className} ${styles.nav}`}>
                <>
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.navLink}
                            className={`scale ${styles.navItem}`}
                            onClick={() => {
                                handleScrollTop();
                                sidebarRef.current?.closeSidebar();
                            }}
                        >
                            {item.navTitle}
                        </Link>
                    ))}
                </>
            </div>
        )
    }

    return (
        <div className={`layout-wrapper ${mainHeaderShadow ? styles.headerShadow : ""} ${styles.headerWrapper}`}>
            <div className={`layout ${styles.header}`}>
                <div className={styles.left}>
                    <Link to="/">
                        {logoData ?
                            (
                                <img
                                    src={theme === "light"
                                        ? logoData?.logo_light
                                        : logoData?.logo_dark}
                                    alt="Logo"
                                    className={styles.logo}
                                    onClick={handleScrollTop}
                                />
                            ) : <div className={styles.logo}>Logo</div>
                        }
                    </Link>
                </div>
                <div className={styles.right}>
                    {nav()}
                    <div className={styles.actions}>
                        <button
                            className={`scale ${styles.btn} ${styles.themeBtn}`}
                            onClick={toggleTheme}
                        >
                            <div className={styles["toggle-btn-hover"]}></div>
                            <SunIcon stroke="var(--second-color)" />
                        </button>
                        <Sidebar
                            ref={sidebarRef}
                            sidebarContainerClass={styles["sidebar-container"]}
                            sidebarHeaderClass={styles["sidebar-header"]}
                            openBtnLabel={<MenuIcon fill="var(--second-color)" stroke="var(--second-color)" />}
                            sidebartitle="Menu"
                        >
                            {nav(styles.mobileNav)}
                        </Sidebar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header