import React from "react";

const Button = ({ styles }) => {
  return (
    <button
      className={`py-2.5 px-6 bg-purple-gradient font-poppins font-medium text-[18px] text-white outline-none whitespace-nowrap ${styles} rounded-[10px]`}
    >
      Get Started
    </button>
  );
};

export default Button;
