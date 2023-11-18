import Link from "next/link";
import React from "react";

const Sidebar = ({ open }) => {
  return (
    <>
      <div className="md:block">
        <aside
          style={{
            display: open ? "block" : "none",
            position: open ? "absolute" : "relative",
            borderRadius: open ? "5px" : "0px",
            background: open ? "#fff" : "transparent",
            "--tw-translate-x": open ? "0px" : "-100px",
            transform: open
              ? " translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
              : "none",
            transitionProperty: "transform",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "150ms",
          }}
          id="default-sidebar"
          className=" z-40 w-52 sm:w-40 md:w-52  transition-transform -translate-x-full sm:translate-x-0 hide"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {/* <li>
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li> */}
              <li>
                <Link
                  href="/profile/inventory"
                  className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 13V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V13H2V11L3 6H21L22 11V13H21ZM5 13V19H19V13H5ZM6 14H14V17H6V14ZM3 3H21V5H3V3Z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Inventory
                  </span>
                  {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          Pro
                        </span> */}
                </Link>
              </li>

              <li>
                <Link
                  href="/profile/mail"
                  className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.8032 8.4928C19.4663 8.81764 20.2118 9 21 9C21.3425 9 21.6769 8.96557 22 8.89998V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H16.1C16.0344 3.32311 16 3.65753 16 4C16 5.23672 16.449 6.36857 17.1929 7.24142L12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L18.8032 8.4928ZM21 7C19.3431 7 18 5.65685 18 4C18 2.34315 19.3431 1 21 1C22.6569 1 24 2.34315 24 4C24 5.65685 22.6569 7 21 7Z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Mail</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/user"
                  className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.68735 4.00008L11.294 1.39348C11.6845 1.00295 12.3176 1.00295 12.7082 1.39348L15.3148 4.00008H19.0011C19.5533 4.00008 20.0011 4.4478 20.0011 5.00008V8.68637L22.6077 11.293C22.9982 11.6835 22.9982 12.3167 22.6077 12.7072L20.0011 15.3138V19.0001C20.0011 19.5524 19.5533 20.0001 19.0011 20.0001H15.3148L12.7082 22.6067C12.3176 22.9972 11.6845 22.9972 11.294 22.6067L8.68735 20.0001H5.00106C4.44877 20.0001 4.00106 19.5524 4.00106 19.0001V15.3138L1.39446 12.7072C1.00393 12.3167 1.00393 11.6835 1.39446 11.293L4.00106 8.68637V5.00008C4.00106 4.4478 4.44877 4.00008 5.00106 4.00008H8.68735ZM12.0011 15.0001C13.6579 15.0001 15.0011 13.6569 15.0011 12.0001C15.0011 10.3432 13.6579 9.00008 12.0011 9.00008C10.3442 9.00008 9.00106 10.3432 9.00106 12.0001C9.00106 13.6569 10.3442 15.0001 12.0011 15.0001Z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
