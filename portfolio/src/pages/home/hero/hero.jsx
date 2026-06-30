import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useGet } from "../../../services/methods";
import styles from "./hero.module.css";
import { ForwardIcon } from "../../../assets/svg/icons";
import MotionReveal from "../../../components/motion/motionReveal";
function Hero() {
    const [data, setData] = useState(null);

    useGet({
        path: "/api/home",
        setData: setData
    })

    useEffect(() => {
        console.log(JSON.stringify(data, null, 2))
    }, [data])

    const homeData = data?.[0];

    return (
        <>
            <div className={`layout-wrapper ${styles.wrapper}`}>
                <div className={`layout ${styles.hero}`}>
                    <MotionReveal className={styles.left}>
                        <MotionReveal distance={60} duration={0.8} className={styles.content} >
                            <div className={styles.title}>
                                {homeData?.title}
                            </div>
                            <div className={styles.des}>
                                {homeData?.description}
                            </div>
                            <div className={styles.btns}>
                                <Link to="/projects" className={`${styles.cta} ${styles.cta1}`}>
                                    {homeData?.cta_1}
                                </Link>
                                <Link to="/contact" className={`${styles.cta} ${styles.cta2}`}>
                                    <span className={`underline ${styles.underline}`}>{homeData?.cta_2}</span>
                                    <span><ForwardIcon fill="white" /></span>
                                </Link>
                            </div>
                        </MotionReveal>
                    </MotionReveal>
                    <MotionReveal className={styles.right}>
                        <img
                            src={homeData?.image}
                            alt="Hero-image"
                            className={styles.image}
                        />
                    </MotionReveal>
                </div>
            </div>
        </>
    )
}

export default Hero