import { useState } from 'react';
import axios from 'axios';

const UpdatePayment = () => {
  const [paymentId, setPaymentId] = useState('');
  const [status, setStatus] = useState('');

  const handlePaymentIdChange = (e) => {
    setPaymentId(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/payments/${paymentId}`, {
        paymentId,
        status,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpdatePayment}>
      <label>
        Payment ID:
        <input type="text" value={paymentId} onChange={handlePaymentIdChange} />
      </label>
      <label>
        Status:
        <input type="text" value={status} onChange={handleStatusChange} />
      </label>
      <button type="submit">Update Payment Status</button>
    </form>
  );
};

export default UpdatePayment;
