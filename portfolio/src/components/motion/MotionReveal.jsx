import { useMemo } from "react";
import styles from "./MotionReveal.module.css";
import useInView from "./useInView";
import { useLoader } from "../loader/loaderProvider";

export default function MotionReveal({
    children,

    as: Component = "div",

    animation = "fadeUp",

    trigger = "load",

    distance = 40,

    duration = 0.6,
    delay = 0,
    ease = "ease",

    once = true,
    amount = 0.3,
    rootMargin = "0px",

    className = "",
    style = {},

    ...props
}) {
    const { isLoading } = useLoader();

    const { ref, isInView } = useInView({
        once,
        amount,
        rootMargin,
    });

    const motion = useMemo(() => {
        switch (animation) {
            case "fadeUp":
                return {
                    x: 0,
                    y: distance,
                    scale: 1,
                };

            case "fadeDown":
                return {
                    x: 0,
                    y: -distance,
                    scale: 1,
                };

            case "fadeLeft":
                return {
                    x: -distance,
                    y: 0,
                    scale: 1,
                };

            case "fadeRight":
                return {
                    x: distance,
                    y: 0,
                    scale: 1,
                };

            case "zoomIn":
                return {
                    x: 0,
                    y: 0,
                    scale: 0.9,
                };

            case "zoomOut":
                return {
                    x: 0,
                    y: 0,
                    scale: 1.1,
                };

            case "fade":
            default:
                return {
                    x: 0,
                    y: 0,
                    scale: 1,
                };
        }
    }, [animation, distance]);

    const show =
        !isLoading &&
        (
            trigger === "load"
                ? true
                : isInView
        );

    return (
        <Component
            ref={ref}
            className={`${styles.motion} ${show ? styles.show : ""} ${className}`}
            style={{
                "--motion-x": `${motion.x}px`,
                "--motion-y": `${motion.y}px`,
                "--motion-scale": motion.scale,

                "--motion-duration": `${duration}s`,
                "--motion-delay": `${delay}s`,
                "--motion-ease": ease,

                ...style,
            }}
            {...props}
        >
            {children}
        </Component>
    );
}