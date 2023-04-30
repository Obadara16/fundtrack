const User = require('../models/authModel');
const Transaction = require('../models/transactionModel');

const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ walletBalance: user.walletBalance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const addFunds = async (req, res) => {
    try {
      const { userId, amount } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.walletBalance += amount;
      await user.save();
      const transaction = new Transaction({
        userId,
        type: 'add',
        amount,
        date: new Date()
      });
      await transaction.save();
      res.json({ walletBalance: user.walletBalance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const withdrawFunds = async (req, res) => {
    try {
      const { userId, amount } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.walletBalance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }
      user.walletBalance -= amount;
      await user.save();
      const transaction = new Transaction({
        userId,
        type: 'withdraw',
        amount,
        date: new Date()
      });
      await transaction.save();
      res.json({ walletBalance: user.walletBalance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



module.exports = {
  getWalletBalance,
  addFunds,
  withdrawFunds

};
