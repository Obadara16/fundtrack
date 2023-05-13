import React from "react";
import moment from "moment";

const DateTimeFormat = (props) => {
  const { value, size } = props;
  const date = moment(value);
  const formattedDate = date.format("D MMM, YYYY");
  const formattedTime = date.format("h:mm A");

  return (
    <span className={`text-[${size}px]`}>
      {formattedDate} {formattedTime.toLowerCase()}
    </span>
  );
};

export default DateTimeFormat;
