import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

import { useLocation } from "react-router-dom";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {

    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    const loadingCount = useRef(0);
    const startTime = useRef(Date.now());

    const showLoader = () => {

        if (loadingCount.current === 0) {
            startTime.current = Date.now();
            setIsLoading(true);
        }

        loadingCount.current++;

    };

    const hideLoader = () => {

        loadingCount.current = Math.max(
            loadingCount.current - 1,
            0
        );

        if (loadingCount.current > 0) return;

        const elapsed = Date.now() - startTime.current;
        const delay = Math.max(1000 - elapsed, 0);

        setTimeout(() => {
            setIsLoading(false);
        }, delay);

    };

    useEffect(() => {

        startTime.current = Date.now();
        setIsLoading(true);

        const timer = setTimeout(() => {

            if (loadingCount.current === 0) {
                setIsLoading(false);
            }

        }, 1500);

        return () => clearTimeout(timer);

    }, [location.pathname]);

    return (
        <LoaderContext.Provider
            value={{
                isLoading,
                startLoading: showLoader,
                finishLoading: hideLoader
            }}
        >
            {children}
        </LoaderContext.Provider>
    );

}

export function useLoader() {

    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("useLoader must be used inside LoaderProvider");
    }

    return context;

}