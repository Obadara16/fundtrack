import React, { useContext, useState } from "react";
import { AppContext } from "../context/usercontext";

const CardDesign = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const user = useContext(AppContext);
  const userInfo = user.userProfile;
  const fullName = userInfo.firstName + " " + userInfo.lastName;

  return (
    // <div onClick={handleFlip}>
    //   <ReactPaymentCard
    //     bank="nubank"
    //     model="normal"
    //     type="platinum"
    //     brand="mastercard"
    //     number="4111111111111111"
    //     cvv="202"
    //     holderName={fullName}
    //     expiration="12/20"
    //     flipped={isFlipped}
    //   />
    // </div>
    //     <div onClick={handleFlip}>
    //     <PaymentCard
    //   bank="nubank"
    //   model="normal"
    //   background="#a72298"
    //   brand="mastercard"
    //   number="4111111111111111"
    //   cvv="202"
    //   holderName="Eleanor Pena"
    //   expiration="12/20"
    //   flipped={isFlipped}
    // />
    // </div>
    <div className="w-full justify-center items-center">
      <p className="text-white">No cards yet</p>
    </div>
  );
};

export default CardDesign;
