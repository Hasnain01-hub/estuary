import Link from "next/link";
import React from "react";

const Sidebar = ({ open }) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
          className=" z-10 w-52 sm:w-40 md:w-52  transition-transform -translate-x-full sm:translate-x-0 hide"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/profile/dashboard"
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
              </li>
              <li>
                <div className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 13V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V13H2V11L3 6H21L22 11V13H21ZM5 13V19H19V13H5ZM6 14H14V17H6V14ZM3 3H21V5H3V3Z"></path>
                  </svg>
                  <Link href="/profile/inventory">
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Inventory
                    </span>
                  </Link>

                  <span
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 cursor-pointer rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    {!isOpen ? (
                      <svg
                        className="w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"></path>
                      </svg>
                    )}
                  </span>
                </div>
                <ul
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <li
                    style={{
                      display: !isOpen ? "none" : "",
                    }}
                  >
                    <Link
                      href="/profile/order"
                      className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.50045 20.0005C6.32888 20.0005 7.00045 20.672 7.00045 21.5005C7.00045 22.3289 6.32888 23.0005 5.50045 23.0005C4.67203 23.0005 4.00045 22.3289 4.00045 21.5005C4.00045 20.672 4.67203 20.0005 5.50045 20.0005ZM18.5005 20.0005C19.3289 20.0005 20.0005 20.672 20.0005 21.5005C20.0005 22.3289 19.3289 23.0005 18.5005 23.0005C17.672 23.0005 17.0005 22.3289 17.0005 21.5005C17.0005 20.672 17.672 20.0005 18.5005 20.0005ZM2.17203 1.75781L5.99981 5.58581V16.9998L20.0005 17.0005V19.0005H5.00045C4.44817 19.0005 4.00045 18.5527 4.00045 18.0005L3.99981 6.41381L0.757812 3.17203L2.17203 1.75781ZM16.0005 3.00045C16.5527 3.00045 17.0005 3.44817 17.0005 4.00045L16.9998 5.99981L19.9936 6.00045C20.5497 6.00045 21.0005 6.45612 21.0005 6.99585V15.0051C21.0005 15.5548 20.5505 16.0005 19.9936 16.0005H8.0073C7.45123 16.0005 7.00045 15.5448 7.00045 15.0051V6.99585C7.00045 6.44611 7.4504 6.00045 8.0073 6.00045L10.9998 5.99981L11.0005 4.00045C11.0005 3.44817 11.4482 3.00045 12.0005 3.00045H16.0005ZM11.0005 8.00045H10.0005V14.0005H11.0005V8.00045ZM18.0005 8.00045H17.0005V14.0005H18.0005V8.00045ZM15.0005 5.00045H13.0005V6.00045H15.0005V5.00045Z"></path>
                      </svg>

                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Orders
                      </span>
                    </Link>
                  </li>
                  <li
                    style={{
                      display: !isOpen ? "none" : "",
                    }}
                  >
                    <Link
                      href="/profile/wishlist"
                      className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM6 7V9H14V7H6ZM6 11V13H14V11H6ZM6 15V17H11V15H6Z"></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        WishList
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  href="/profile/notifications"
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
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Notifications
                  </span>
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
