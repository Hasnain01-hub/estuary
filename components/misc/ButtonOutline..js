import React from "react";

const ButtonOutline = ({ children }) => {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-primarycolor-500 hover:text-primarycolor transition-all hover:shadow-scolor " 
    
    >
      {" "}
      {children}
    </button>
  );
};

export default ButtonOutline;
