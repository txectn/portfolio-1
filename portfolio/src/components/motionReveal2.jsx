// // MotionReveal.jsx

// import { motion } from "framer-motion";
// import { useLoader } from "./loader/loaderProvider";

// export default function MotionReveal({
//   children,
//   delay = 0,
//   y = 40,
//   duration = 0.6,
//   ...props
// }) {
//   const { isLoading } = useLoader();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y }}
//       animate={
//         isLoading
//           ? { opacity: 0, y }
//           : { opacity: 1, y: 0 }
//       }
//       transition={{
//         duration,
//         delay,
//         ease: "easeOut",
//       }}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   );
// }


// import { motion } from "framer-motion";
// import { useLoader } from "./loader/loaderProvider";

// const animations = {
//     fadeUp: {
//         initial: { opacity: 0, y: 40 },
//         animate: { opacity: 1, y: 0 },
//     },

//     fadeDown: {
//         initial: { opacity: 0, y: -40 },
//         animate: { opacity: 1, y: 0 },
//     },

//     fadeLeft: {
//         initial: { opacity: 0, x: -40 },
//         animate: { opacity: 1, x: 0 },
//     },

//     fadeRight: {
//         initial: { opacity: 0, x: 40 },
//         animate: { opacity: 1, x: 0 },
//     },

//     fade: {
//         initial: { opacity: 0 },
//         animate: { opacity: 1 },
//     },

//     zoomIn: {
//         initial: { opacity: 0, scale: 0.9 },
//         animate: { opacity: 1, scale: 1 },
//     },

//     zoomOut: {
//         initial: { opacity: 0, scale: 1.1 },
//         animate: { opacity: 1, scale: 1 },
//     },
// };

// export default function MotionReveal({
//     children,
//     animation = "fadeUp",
//     duration = 0.6,
//     delay = 0,
//     ease = "easeOut",
//     once = true,
//     className,
//     style,
//     ...props
// }) {
//     const { isLoading } = useLoader();

//     const variant = animations[animation] || animations.fadeUp;

//     return (
//         <motion.div
//             className={className}
//             style={style}
//             initial={variant.initial}
//             animate={
//                 isLoading
//                     ? variant.initial
//                     : variant.animate
//             }
//             transition={{
//                 duration,
//                 delay,
//                 ease,
//             }}
//             viewport={{ once }}
//             {...props}
//         >
//             {children}
//         </motion.div>
//     );
// }



// import { motion } from "framer-motion";
// import { useLoader } from "./loader/loaderProvider";

// const animations = {
//     fadeUp: {
//         initial: { opacity: 0, y: 40 },
//         animate: { opacity: 1, y: 0 },
//     },

//     fadeDown: {
//         initial: { opacity: 0, y: -40 },
//         animate: { opacity: 1, y: 0 },
//     },

//     fadeLeft: {
//         initial: { opacity: 0, x: -40 },
//         animate: { opacity: 1, x: 0 },
//     },

//     fadeRight: {
//         initial: { opacity: 0, x: 40 },
//         animate: { opacity: 1, x: 0 },
//     },

//     fade: {
//         initial: { opacity: 0 },
//         animate: { opacity: 1 },
//     },

//     zoomIn: {
//         initial: { opacity: 0, scale: 0.9 },
//         animate: { opacity: 1, scale: 1 },
//     },

//     zoomOut: {
//         initial: { opacity: 0, scale: 1.1 },
//         animate: { opacity: 1, scale: 1 },
//     },
// };

// export default function MotionReveal({
//     children,
//     animation = "fadeUp",

//     // Animation trigger
//     trigger = "load", // "load" | "view"

//     // Transition
//     duration = 0.6,
//     delay = 0,
//     ease = "easeOut",

//     // Viewport options
//     once = true,
//     amount = 0.3,

//     className,
//     style,
//     ...props
// }) {
//     console.log(trigger);
//     const { isLoading } = useLoader();

//     const variant = animations[animation] || animations.fadeUp;

//     return (
//         <motion.div
//             className={className}
//             style={style}
//             initial={variant.initial}
//             {...(
//                 trigger === "view"
//                     ? {
//                         whileInView: variant.animate,
//                         viewport: {
//                             once,
//                             amount,
//                         },
//                     }
//                     : {
//                         animate: isLoading
//                             ? variant.initial
//                             : variant.animate,
//                     }
//             )}
//             transition={{
//                 duration,
//                 delay,
//                 ease,
//             }}
//             {...props}
//         >
//             {children}
//         </motion.div>
//     );
// }


// import { motion } from "framer-motion";
// import { useLoader } from "./loader/loaderProvider";

// export default function MotionReveal({
//     children,
//     animation = "fadeUp",

//     // Animation trigger
//     trigger = "load", // "load" | "view"

//     // Animation distance
//     distance = 40,

//     // Transition
//     duration = 0.6,
//     delay = 0,
//     ease = "easeOut",

//     // Viewport options
//     once = true,
//     amount = 0.3,

//     className,
//     style,
//     ...props
// }) {
//     const { isLoading } = useLoader();

//     const animations = {
//         fadeUp: {
//             initial: { opacity: 0, y: distance },
//             animate: { opacity: 1, y: 0 },
//         },

//         fadeDown: {
//             initial: { opacity: 0, y: -distance },
//             animate: { opacity: 1, y: 0 },
//         },

//         fadeLeft: {
//             initial: { opacity: 0, x: -distance },
//             animate: { opacity: 1, x: 0 },
//         },

//         fadeRight: {
//             initial: { opacity: 0, x: distance },
//             animate: { opacity: 1, x: 0 },
//         },

//         fade: {
//             initial: { opacity: 0 },
//             animate: { opacity: 1 },
//         },

//         zoomIn: {
//             initial: { opacity: 0, scale: 0.9 },
//             animate: { opacity: 1, scale: 1 },
//         },

//         zoomOut: {
//             initial: { opacity: 0, scale: 1.1 },
//             animate: { opacity: 1, scale: 1 },
//         },
//     };

//     const variant = animations[animation] || animations.fadeUp;

//     return (
//         <motion.div
//             className={className}
//             style={style}
//             initial={variant.initial}
//             {...(
//                 trigger === "view"
//                     ? {
//                           whileInView: variant.animate,
//                           viewport: {
//                               once,
//                               amount,
//                           },
//                       }
//                     : {
//                           animate: isLoading
//                               ? variant.initial
//                               : variant.animate,
//                       }
//             )}
//             transition={{
//                 duration,
//                 delay,
//                 ease,
//             }}
//             {...props}
//         >
//             {children}
//         </motion.div>
//     );
// }



import { motion } from "framer-motion";
import { useLoader } from "./loader/loaderProvider";

export default function MotionReveal({
    children,
    animation = "fadeUp",

    trigger = "load", // "load" | "view"

    distance = 40,

    duration = 0.6,
    delay = 0,
    ease = "easeOut",

    once = true,
    amount = 0.3,

    className,
    style,
    ...props
}) {
    const { isLoading } = useLoader();

    const animations = {
        fadeUp: {
            initial: { opacity: 0, y: distance },
            animate: { opacity: 1, y: 0 },
        },
        fadeDown: {
            initial: { opacity: 0, y: -distance },
            animate: { opacity: 1, y: 0 },
        },
        fadeLeft: {
            initial: { opacity: 0, x: -distance },
            animate: { opacity: 1, x: 0 },
        },
        fadeRight: {
            initial: { opacity: 0, x: distance },
            animate: { opacity: 1, x: 0 },
        },
        fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
        },
        zoomIn: {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
        },
        zoomOut: {
            initial: { opacity: 0, scale: 1.1 },
            animate: { opacity: 1, scale: 1 },
        },
    };

    const variant = animations[animation] || animations.fadeUp;

    // ❗ KEY FIX: freeze animation until loader finishes
    const safeInitial = isLoading
        ? variant.initial
        : variant.initial;

    const safeAnimate = isLoading
        ? variant.initial
        : variant.animate;

    return (
        <motion.div
            className={className}
            style={style}
            initial={safeInitial}
            animate={
                trigger === "view"
                    ? safeAnimate
                    : safeAnimate
            }
            whileInView={
                trigger === "view" && !isLoading
                    ? variant.animate
                    : undefined
            }
            viewport={
                trigger === "view"
                    ? { once, amount }
                    : undefined
            }
            transition={{
                duration,
                delay,
                ease,
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}