import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './style.css'
import BankLogo from '../BankLogo'
import ModelLogo from '../ModelLogo'
import BrandLogo from '../BrandLogo'



const formatCardNumber = cardNumber =>
  cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ')

const PaymentCard = ({
  bank,
  model,
  type,
  number,
  cvv,
  expiration,
  holderName,
  brand,
  flipped,
  className,
}) => (
  <div className={styles.wrapper}>
    <div className={cardClasses(bank, model, type, flipped, className)}>
      <div className={styles.front}>
        <BankLogo
          bank={bank}
          model={model}
          type={type}
        />
        <ModelLogo
          bank={bank}
          model={model}
          type={type}
        />
        <div className={styles.chip}>
          <div className={styles.horizontalLine} />
          <div className={styles.verticalLine} />
        </div>
        <div className={styles.number}>
          {formatCardNumber(number)}
        </div>
        <div className={styles.expiration}>
          {expiration}
        </div>
        <div className={styles.holderName}>
          {holderName}
        </div>
        <BrandLogo
          brand={brand}
          bank={bank}
          model={model}
          type={type}
        />
      </div>
      <div className={styles.back}>
        <div className={styles.cvv}>
          {cvv}
        </div>
      </div>
    </div>
  </div>
)

PaymentCard.propTypes = {
  bank: PropTypes.string,
  model: PropTypes.string,
  type: PropTypes.string,
  brand: PropTypes.string,
  number: PropTypes.string,
  cvv: PropTypes.string,
  holderName: PropTypes.string,
  expiration: PropTypes.string,
  flipped: PropTypes.bool,
  className: PropTypes.string,
}

PaymentCard.defaultProps = {
  bank: '',
  model: '',
  type: '',
  brand: '',
  number: '•••• •••• •••• ••••',
  cvv: '•••',
  holderName: 'Nome Completo',
  expiration: 'MM/AA',
  flipped: false,
  className: null,
}

export default PaymentCard;
