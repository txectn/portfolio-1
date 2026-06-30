import {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef
} from "react";
import "./sidebar.css";
import { CloseIcon } from "../../assets/svg/icons";


const Sidebar = forwardRef(({
    // Custom classes
    sidebarContainerClass,
    sidebarClass,
    sidebarOpenBtnClass,
    sidebarOverlayClass,
    sidebarHeaderClass,
    sidebarHeaderTitleClass,
    sidebarCloseBtnClass,

    // Custom props
    openBtnLabel = "Open",
    closeButtonSvgWidth = "27",
    closeButtonSvgHeight = "27",
    sidebartitle = "Sidebar",
    scrollLogic = true,

    openBtnAnywhere = false,
    closeBtnAnywhere = false,

    children
}, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    /* Internal handlers */
    const toggleSidebar = () => setIsOpen(prev => !prev);
    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    /* Expose to parent (IMPORTANT) */
    useImperativeHandle(ref, () => ({
        openSidebar,
        closeSidebar,
        toggleSidebar,

        // reusable open button props
        openBtnProps: {
            className: `sidebar-open-btn ${sidebarOpenBtnClass || ""}`,
            onClick: toggleSidebar,
            children: openBtnLabel
        },

        // reusable close button props
        closeBtnProps: {
            className: `sidebar-close-btn ${sidebarCloseBtnClass || ""}`,
            onClick: closeSidebar
        }
    }));

    /* Scroll helpers */
    const disableScroll = () => {
        const html = document.documentElement;
        const body = document.body;

        if (html.style.overflow === "hidden") return;

        const scrollWidth = window.innerWidth - html.clientWidth;

        html.style.overflow = "hidden";
        if (scrollWidth > 0) {
            body.style.paddingRight = `${scrollWidth}px`;
        }
    };

    const enableScroll = () => {
        document.documentElement.style.overflow = "";
        document.body.style.paddingRight = "";
    };

    /* Scroll control */

    useEffect(() => {
        if (!scrollLogic) return;

        let timeout;

        if (isOpen) {
            disableScroll();
        } else {
            timeout = setTimeout(() => {
                enableScroll();
            }, 150); 
        }

        return () => clearTimeout(timeout);
    }, [isOpen, scrollLogic]);

    /* Resize logic */
    useEffect(() => {
        if (!scrollLogic) return;

        const handleResize = () => {
            if (!isOpen || !containerRef.current) return;

            const computedStyle = window.getComputedStyle(containerRef.current);
            const isHidden = computedStyle.display === "none";
            const isScrollDisabled = document.documentElement.style.overflow === "hidden";

            if (isHidden) enableScroll();
            else if (!isScrollDisabled) disableScroll();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen, scrollLogic]);


    useEffect(() => {
        if (!scrollLogic) return;

        if (isOpen) {
            // Add a history entry when sidebar opens
            window.history.pushState({ sidebar: true }, "");
        }

        const handlePopState = (event) => {
            if (isOpen) {
                closeSidebar();
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isOpen]);


    return (
        <aside
            ref={containerRef}
            className={`container ${sidebarContainerClass || ""}`}
            style={{
                display: "inline-flex",
                alignItems: "center",
            }}
        >

            {/* Internal Open Button */}
            {!openBtnAnywhere && (
                <button
                    className={`sidebar-open-btn ${sidebarOpenBtnClass || ""}`}
                    onClick={toggleSidebar}
                >
                    {openBtnLabel}
                    <div className="sidebar-btn-hover"></div>
                </button>
            )}

            {/* Overlay */}
            <div
                className={`sidebar-overlay ${sidebarOverlayClass || ""} ${isOpen ? "open" : ""}`}
                onClick={closeSidebar}
            />

            {/* Sidebar */}
            <div className={`sidebar ${sidebarClass || ""} ${isOpen ? "open" : ""}`}
            >
                <div className={`sidebar-header ${sidebarHeaderClass || ""}`}
                >

                    <div className={`sidebar-header-title ${sidebarHeaderTitleClass || ""}`}
                    >
                        {sidebartitle}
                    </div>

                    {!closeBtnAnywhere && (
                        <button
                            className={`sidebar-close-btn ${sidebarCloseBtnClass || ""}`}
                            onClick={closeSidebar}
                        >
                            <CloseIcon
                                width={closeButtonSvgWidth}
                                height={closeButtonSvgHeight}
                                stroke="var(--second-color)"
                            />
                            <div className="sidebar-btn-hover"></div>
                        </button>
                    )}
                </div>
                {children}
            </div>
        </aside>
    );
});

export default Sidebar;