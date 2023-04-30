import { useState } from 'react';
import axios from 'axios';

const WithdrawFunds = () => {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [transactionHistory, setTransactionHistory] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWithdrawFunds = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/wallets/withdraw', {
        userId: 'USER_ID', // Replace with the actual user ID
        amount: parseFloat(amount),
      });
      const updatedWallet = response.data.wallet;
      setWallet(updatedWallet);
    //   setSuccessMessage('Funds added successfully!');
      
      const transaction = await axios.post('/transactions', {
        userId: user.id,
        type: 'withdraw',
        amount: parseFloat(amount),
      });
      createTransaction(transaction.data);
    } catch (error) {
      console.error(error);
    //   setErrorMessage('Error adding funds');
    }
  };

  return (
    <form onSubmit={handleWithdrawFunds}>
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <button type="submit">Withdraw Funds</button>
    </form>
  );
};

export default WithdrawFunds;
