import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { MailIcon, LinkedinIcon, InstagramIcon } from "../../assets/svg/icons"
import { useGet } from "../../services/methods"
import styles from "./footer.module.css"

function Footer() {
    const [data, setData] = useState(null);
    useGet({
        path: "/api/footer",
        setData: setData
    })
    
    return (
        <div className={styles.footer}>
            <div className={`layout-wrapper ${styles["footer-items"]}`}>
                <div className={`layout ${styles["item-grid"]}`}>
                    <div className={styles["right"]}>
                        <div className={`${styles["rights-item"]} ${styles["item"]}`}>
                            <span>{data?.[0]?.footer_rights}</span>
                        </div>
                    </div>
                    <div className={styles["left"]}>
                        <Link to={data?.[0]?.footer_links?.instagram?.link} className={styles["item"]}>
                            <InstagramIcon fill="var(--second-color)" />
                        </Link>
                        <Link to={data?.[0]?.footer_links?.linkedin?.link} className={styles["item"]}>
                            <LinkedinIcon fill="var(--second-color)" />
                        </Link>
                        <Link to={data?.[0]?.footer_links?.email?.link} className={styles["item"]}>
                            <MailIcon fill="var(--second-color)" />
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Footer