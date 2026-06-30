import { useEffect, useRef, useState } from "react";

export default function useInView({
    once = true,
    amount = 0.3,
    rootMargin = "0px",
} = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log(entry);
                console.log({
                    isIntersecting: entry.isIntersecting,
                    ratio: entry.intersectionRatio,
                    top: entry.boundingClientRect.top,
                    bottom: entry.boundingClientRect.bottom,
                    height: entry.boundingClientRect.height,
                    viewportHeight: window.innerHeight,
                    rootBounds: entry.rootBounds,
                });

                if (entry.isIntersecting) {
                    setIsInView(true);

                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    setIsInView(false);
                }
            },
            {
                threshold: amount,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [once, amount, rootMargin]);

    return {
        ref,
        isInView,
    };
}