import React from "react";

const CurrencyFormat = (props) => {
  const { value, size } = props;
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return <span className={`text-[${size}px]`}>{formatter.format(value)}</span>;
};

export default CurrencyFormat;
