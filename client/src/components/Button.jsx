import React from "react";
import { Link } from "react-router-dom";

const Button = ({ styles, text }) => {
  return (
    <Link to="/login">
        <button
        className={`py-2.5 px-6 bg-purple-gradient font-poppins font-medium text-[18px] text-white outline-none whitespace-nowrap ${styles} rounded-[10px]`}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
