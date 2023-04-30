import { useState } from 'react';
import axios from 'axios';

const MakePayment = () => {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [transactionHistory, setTransactionHistory] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMakePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/payments', {
        userId: '123456',
        amount: parseFloat(amount),
      });
      const updatedWallet = response.data.wallet;
      setWallet(updatedWallet);
    //   setSuccessMessage('Funds added successfully!');
      
      const transaction = await axios.post('/transactions', {
        userId: user.id,
        type: 'payment',
        amount: parseFloat(amount),
      });
      createTransaction(transaction.data);
    } catch (error) {
      console.error(error);
    //   setErrorMessage('Error adding funds');
    }
  };

  return (
    <form onSubmit={handleMakePayment}>
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <button type="submit">Make Payment</button>
    </form>
  );
};

export default MakePayment;
