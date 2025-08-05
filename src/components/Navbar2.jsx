// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
// import { IconLayoutNavbarCollapse, IconUser, IconUsers, IconMessage, IconLogout, IconHome, IconUserPlus } from "@tabler/icons-react";
// import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeUser } from "../../utils/userSlice";

// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

// const NAV_ITEMS = [
//   { title: "Home", icon: <IconHome size={28} />, href: "/" },
//   { title: "Profile", icon: <IconUser size={28} />, href: "/profile/view" },
//   { title: "Connections", icon: <IconUsers size={28} />, href: "/connections" },
//   { title: "Requests", icon: <IconUserPlus size={28} />, href: "/requests" },
//   { title: "Chat", icon: <IconMessage size={28} />, href: "/chat" },
// ];

// export const Navbar2 = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const items = [
//     ...NAV_ITEMS,
//     {
//       title: "Logout",
//       icon: <IconLogout size={28} />,
//       href: "#",
//       onClick: () => {
//         dispatch(removeUser());
//         navigate("/login");
//       }
//     }
//   ];

//   return (
//     <>
//       <FloatingDockDesktop items={items} />
//       <FloatingDockMobile items={items} />
//     </>
//   );
// };

// const FloatingDockMobile = ({ items }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className=" bottom-6 right-6 z-50 block md:hidden">
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             layoutId="nav"
//             className="absolute bottom-full mb-2 flex flex-col gap-2"
//           >
//             {items.map((item, idx) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{
//                   opacity: 0,
//                   y: 10,
//                   transition: { delay: idx * 0.05 }
//                 }}
//                 transition={{ delay: (items.length - 1 - idx) * 0.05 }}
//               >
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     if (item.onClick) item.onClick();
//                     else window.location.href = item.href;
//                   }}
//                   className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 shadow-lg"
//                 >
//                   <div className="h-6 w-6">{item.icon}</div>
//                 </button>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 shadow-lg"
//       >
//         <IconLayoutNavbarCollapse className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
//       </button>
//     </div>
//   );
// };

// const FloatingDockDesktop = ({ items }) => {
//   let mouseX = useMotionValue(Infinity);
//   return (
//     <motion.div
//       onMouseMove={(e) => mouseX.set(e.pageX)}
//       onMouseLeave={() => mouseX.set(Infinity)}
//       className={cn(
//         "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex h-20 items-end gap-4 rounded-2xl bg-gray-50/90 px-6 pb-4 dark:bg-neutral-900/90 shadow-2xl border border-gray-200 dark:border-neutral-800"
//       )}
//     >
//       {items.map((item) => (
//         <IconContainer mouseX={mouseX} key={item.title} {...item} />
//       ))}
//     </motion.div>
//   );
// };

// function IconContainer({ mouseX, title, icon, href, onClick }) {
//   let ref = useRef(null);

//   let distance = useTransform(mouseX, (val) => {
//     let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
//     return val - bounds.x - bounds.width / 2;
//   });

//   let widthTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
//   let heightTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
//   let widthIcon = useTransform(distance, [-150, 0, 150], [24, 40, 24]);
//   let heightIcon = useTransform(distance, [-150, 0, 150], [24, 40, 24]);

//   let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
//   let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
//   let widthIconSpring = useSpring(widthIcon, { mass: 0.1, stiffness: 150, damping: 12 });
//   let heightIconSpring = useSpring(heightIcon, { mass: 0.1, stiffness: 150, damping: 12 });

//   const [hovered, setHovered] = useState(false);

//   return (
//     <button
//       ref={ref}
//       style={{ width, height }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={() => {
//         if (onClick) onClick();
//         else window.location.href = href;
//       }}
//       className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 transition-all"
//     >
//       <AnimatePresence>
//         {hovered && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, x: "-50%" }}
//             animate={{ opacity: 1, y: 0, x: "-50%" }}
//             exit={{ opacity: 0, y: 2, x: "-50%" }}
//             className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
//           >
//             {title}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <motion.div
//         style={{ width: widthIconSpring, height: heightIconSpring }}
//         className="flex items-center justify-center"
//       >
//         {icon}
//       </motion.div>
//     </button>
//   );
// } 



import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IconLayoutNavbarCollapse, IconUser, IconUsers, IconMessage, IconLogout, IconHome, IconUserPlus } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { title: "Home", icon: <IconHome size={28} />, href: "/" },
  { title: "Profile", icon: <IconUser size={28} />, href: "/profile/view" },
  { title: "Connections", icon: <IconUsers size={28} />, href: "/connections" },
  { title: "Requests", icon: <IconUserPlus size={28} />, href: "/requests" },
  { title: "Chat", icon: <IconMessage size={28} />, href: "/chat" },
];

export const Navbar2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Proper logout function with axios call (same as your working Navbar)
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      // Even if logout API fails, clear local state
      dispatch(removeUser());
      navigate("/login");
    }
  };

  // Only show navbar if user is logged in
  if (!user) {
    return null;
  }

  const items = [
    ...NAV_ITEMS,
    {
      title: "Logout",
      icon: <IconLogout size={28} />,
      href: "#",
      onClick: handleLogout
    }
  ];

  return (
    <>
      <FloatingDockDesktop items={items} navigate={navigate} />
      <FloatingDockMobile items={items} navigate={navigate} />
    </>
  );
};

const FloatingDockMobile = ({ items, navigate }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 block md:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 }
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      navigate(item.href);
                    }
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 shadow-lg transition-all hover:scale-110"
                >
                  <div className="h-6 w-6 text-neutral-600 dark:text-neutral-400">{item.icon}</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 shadow-lg transition-all hover:scale-110"
      >
        <IconLayoutNavbarCollapse className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, navigate }) => {
  let mouseX = useMotionValue(Infinity);
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex h-20 items-end gap-4 rounded-2xl bg-gray-50/90 px-6 pb-4 dark:bg-neutral-900/90 shadow-2xl border border-gray-200 dark:border-neutral-800 backdrop-blur-sm"
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} navigate={navigate} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, onClick, navigate }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  let widthIcon = useTransform(distance, [-150, 0, 150], [24, 40, 24]);
  let heightIcon = useTransform(distance, [-150, 0, 150], [24, 40, 24]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let widthIconSpring = useSpring(widthIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIconSpring = useSpring(heightIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigate(href);
        }
      }}
      className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 transition-all hover:bg-gray-300 dark:hover:bg-neutral-700"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIconSpring, height: heightIconSpring }}
        className="flex items-center justify-center text-neutral-600 dark:text-neutral-400"
      >
        {icon}
      </motion.div>
    </button>
  );
}