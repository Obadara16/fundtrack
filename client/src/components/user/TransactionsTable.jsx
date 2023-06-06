import React, { useContext, useEffect, useState } from 'react'
import CardDesign from '../CardDesign'
import { FaArrowRight, FaBook, FaShoppingBag, FaTv } from 'react-icons/fa'
import { transactions_endpoint } from '../../constants/endpoints';
import { AppContext } from '../../context/usercontext';
import { getRequest } from '../../utils/api';
import CurrencyFormat from '../../atoms/CurrencyFormat';
import DateTimeFormat from '../../atoms/DateTimeFormat';

const TransactionsTable = ({number}) => {
    const [transactions, setTransactions] = useState([""]);
    const [noOfTransactions] = useState(number)
    const transactionSlice = transactions.slice(0, noOfTransactions)
    const userInfo = useContext(AppContext);
    const userId = userInfo.user

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = `${transactions_endpoint.getUserTransactions}/${userId}/transactions`;
        const response = await getRequest(url);
        console.log(response.data)
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, [userId]);
  return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
                <h3 className='font-semibold text-[20px]'>Transactions</h3>
                <div className='flex gap-4 items-center justify-center'>
                    <button className='bg-transparent border-none'>View All </button>
                    <span><Icon icon={<FaArrowRight />} /></span>
                </div>
            </div>
            <div>
                <div className='flex gap-4'>
                    <button className='hover:border-b-2 hover:border-white px-4'>All</button>
                    <button className='hover:border-b-2 hover:border-white px-4'>Revenue</button>
                    <button className='hover:border-b-2 hover:border-white px-4'>Expense</button>
                </div>
                {transactionSlice.map((transaction) => {
              const { _id, type, amount, date } = transaction;
              return (
                        <div className='flex justify-center mt-8 items-center w-full md:w-11/12' key={_id}>
                            <div className='flex items-center justify-center w-2/3 gap-10'>
                                <div className='flex items-center w-1/3'>
                                    <Icon icon={<FaTv />} />
                                </div>
                                <div className='flex flex-col gap-2 w-2/3'>
                                    <h3 className='text-[16px] font-semibold'>Gaming Items</h3>
                                    <p className='text-[12px] font-thin'><DateTimeFormat value={date} size={17}/></p> 
                                </div>
                            </div>
                            <div className='w-1/3 flex justify-center items-center'>
                                {type === "add" && 
                                    <p className='text-[15px] font-bold'><CurrencyFormat value={amount} size={17}/></p>
                                }
                                {type === "withdraw" && 
                                    <p className='text-[15px] font-bold text-red-700'>- <CurrencyFormat value={amount} size={17}/></p>
                                }

                                
                            </div>
                        </div>
              );
            })}
                {/* {transactions.map((transaction => {
                    const {type, date, amount, _id} = transaction;
                    return (
                        <div className='flex justify-center mt-8 items-center w-full md:w-11/12' key={_id}>
                            <div className='flex items-center justify-center w-2/3 gap-10'>
                                <div className='flex items-center w-1/3'>
                                    <Icon icon={<FaTv />} />
                                </div>
                                <div className='flex flex-col gap-2 w-2/3'>
                                    <h3 className='text-[16px] font-semibold'>Gaming Items</h3>
                                    <p className='text-[12px] font-thin'>{date}</p> 
                                </div>
                            </div>
                            <div className='w-1/3 flex justify-center'>
                                {type === "add" && 
                                    <p className='text-[15px] font-semibold'>{amount}</p>
                                }
                                {type === "withdraw" && 
                                    <p className='text-[15px] font-semibold'>-{amount}</p>
                                }

                                
                            </div>
                        </div>
                    )
                }))} */}
                
            </div>
        </div>
  )
}
const Icon = ({ icon }) => (
    <span>
      <a href="#">{icon}</a>
    </span>
  );

export default TransactionsTable