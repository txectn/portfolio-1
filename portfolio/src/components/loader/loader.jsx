// import { THEME_MODE } from "../../constants";
// import { useLoader } from "./loaderProvider";
// import styles from "./loader.module.css";

// function Loader() {
//     const theme = localStorage.getItem(THEME_MODE) || "light";
//     document.documentElement.setAttribute("data-theme", theme);

//     const { isLoading } = useLoader();

//     if (!isLoading) return null;

//     return (
//         <div className={styles.loaderScreen}>
//             <div className={styles.loaderWrapper}>
//                 <div className={styles.loader}>

//                     <span></span>
//                     <span></span>
//                     <span></span>
//                     <span></span>

//                     <div className={`${styles.dot} ${styles.dot1}`}></div>
//                     <div className={`${styles.dot} ${styles.dot2}`}></div>

//                     <div className={styles.center}></div>

//                 </div>
//             </div>
//         </div>
//     );

// }

// export default Loader;



import { HashLoader } from "react-spinners";
import { THEME_MODE } from "../../constants";
import { useLoader } from "./loaderProvider";
import styles from "./loader.module.css";

function Loader() {
    const theme = localStorage.getItem(THEME_MODE) || "light";
    document.documentElement.setAttribute("data-theme", theme);

    const { isLoading } = useLoader();

    if (!isLoading) return null;

    const color =
        theme === "dark"
            ? "#8AB4F8"
            : "#8AB4F8";

    return (
        <div className={styles.loaderScreen}>
            <HashLoader
                color={color}
                size={70}
                speedMultiplier={1}
            />
        </div>
    );
}

export default Loader;