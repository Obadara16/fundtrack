import React from "react";
import { Link } from "react-router-dom";

const PostButton = ({ text, onclick, size, color, width, disabled, value }) => {
  return (
    <>
      <button
        className={`bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-light rounded-md font-light py-2 px-6 ${size === 'sm' ? 'text-xs' : 'text-base'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{
          width: `${width}`,
        }}
        onClick={onclick}
        disabled={disabled}
        value={text}
      >
        {text}
      </button>
    </>
  );
};

export const LinkBtn = ({
  title,
  size,
  color,
  width,
  disabled,
  destination,
}) => {
  return (
    <Link
      to={destination}
      className={`bg-${color}-500 text-light rounded-md font-medium py-2 px-6 ${size === 'sm' ? 'text-xs' : 'text-base'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        width: `${width}`,
      }}
      onClick={onclick}
      disabled={disabled}
    >
      {title}
    </Link>
  );
};

export default PostButton;
