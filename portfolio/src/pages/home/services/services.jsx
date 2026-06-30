import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useGet } from "../../../services/methods"
import MotionReveal from "../../../components/motion/motionReveal"
import styles from "./services.module.css"
function Services() {
    const [data, setData] = useState(null);

    useGet({
        path: "/api/projects",
        setData: setData
    })

    useEffect(() => {
        console.log(JSON.stringify(data, null, 2))
    }, [data])

    return (
        <div className={`layout-wrapper ${styles.wrapper}`}>
            <div className={`layout ${styles.project}`}>
                <div className={`title ${styles.title}`}>
                    <div className={`underline2 {styles.titleText}`}>
                        Services
                    </div>
                </div>
                <div className={`layout ${styles["project-grid"]}`}>
                    {data?.map((item, index) => {
                        const reverse = index % 2 !== 0;

                        return (
                            <MotionReveal
                                key={item.id}
                                amount={0.35}
                                trigger="view"
                                className={`${reverse ? styles["reverse-project-item"] : ""} ${styles["project-item"]}`}
                            >
                                <div className={`
                                    ${reverse ? styles["content-wrapper-reverse"] : ""} 
                                    ${styles["content-wrapper"]}`}
                                >
                                    <MotionReveal amount={0.3} trigger="view" className={styles["content"]}>
                                        <div className={styles["item-title"]}>
                                            {item.title}
                                        </div>
                                        <div className={styles["item-des"]}>
                                            {item.short_description}
                                        </div>
                                        <Link
                                            to={`/projects/${item.slug}`}
                                            className={styles["item-cta"]}
                                        >
                                            View Project
                                        </Link>
                                    </MotionReveal>
                                </div>
                                <div className={styles["image-wrapper"]}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={`${reverse ? styles["reverse-image"] : ""} ${styles["item-image"]}`}
                                    />
                                </div>
                            </MotionReveal>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Services