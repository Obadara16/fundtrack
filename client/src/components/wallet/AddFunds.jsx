import { useState } from 'react';
import axios from 'axios';

const AddFunds = () => {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [transactionHistory, setTransactionHistory] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddFunds = async () => {
    try {
      const response = await axios.post('/wallets/addfunds', {
        userId: user.id,
        amount: parseFloat(amount),
      });
      const updatedWallet = response.data.wallet;
      setWallet(updatedWallet);
    //   setSuccessMessage('Funds added successfully!');
      
      const transaction = await axios.post('/transactions', {
        userId: user.id,
        type: 'add',
        amount: parseFloat(amount),
      });
      createTransaction(transaction.data);
    } catch (error) {
      console.error(error);
    //   setErrorMessage('Error adding funds');
    }
  };
  
  const createTransaction = (transactionData) => {
    setTransactionHistory((prevState) => {
      return [...prevState, transactionData];
    });
  };
  

  return (
    <form onSubmit={handleAddFunds}>
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <button type="submit">Add Funds</button>
    </form>
  );
};

export default AddFunds;
