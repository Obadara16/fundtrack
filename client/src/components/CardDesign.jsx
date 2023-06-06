import React, { useContext, useState } from 'react';

import './CardDesignStyles.css'; // Import the updated CSS styles
import { logo } from '../assets';
import { AppContext } from '../context/usercontext';

const CardDesign = () => {
  const [showBack, setShowBack] = useState(false);

  const user = useContext(AppContext);
  const userInfo = user.userProfile;
  const fullName = userInfo.firstName + " " + userInfo.lastName;

  const handleClick = () => {
    setShowBack(!showBack);
  };

  return (
    <div className={`card-wrapper ${showBack ? 'show-back' : ''}`} onClick={handleClick}>
      <div className="card-container">
        <div className="card">
          <div className={`card-front ${showBack ? 'hide' : ''}`}>
            <div className="card-top">
              <div className="chip">
                <div className="horizontalLine" />
                <div className="styles.verticalLine" />
              </div>
              <img src={logo} alt="Visa" className="visa-logo" />
            </div>
            <div className="card-details">
              <div className="card-number">**** **** **** 1234</div> {/* Replace with the card number */}
              <div className="card-holder uppercase">{fullName}</div> {/* Replace with the card holder name */}
              <div className="card-expiry">06/24</div> {/* Replace with the card expiry date */}
            </div>
          </div>
          <div className={`card-back ${showBack ? 'show' : ''}`}>
            <div className="card-cvv">232</div> {/* Replace with the card CVV */}
            <div className="card-back-chip"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDesign;
