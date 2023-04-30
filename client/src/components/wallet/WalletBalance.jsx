import { useState, useEffect } from 'react';
import axios from 'axios';

const WalletBalance = () => {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('/wallets/123456');
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <p>Current Balance: {balance}</p>
    </div>
  );
};

export default WalletBalance;
