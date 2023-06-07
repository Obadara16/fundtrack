import React, { useContext, useEffect, useState } from 'react';
import CardDesign from '../CardDesign';
import { FaArrowRight, FaBook, FaShoppingBag, FaTv } from 'react-icons/fa';
import { transactions_endpoint } from '../../constants/endpoints';
import { AppContext } from '../../context/usercontext';
import { getRequest } from '../../utils/api';
import CurrencyFormat from '../../atoms/CurrencyFormat';
import DateTimeFormat from '../../atoms/DateTimeFormat';
import { Link, useLocation } from 'react-router-dom';

const TransactionsTable = ({  }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const userInfo = useContext(AppContext);
  const userId = userInfo.user;
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = `${transactions_endpoint.getUserTransactions}/${userId}/transactions`;
        const response = await getRequest(url);
        console.log(response.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, [userId]);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <h3 className='font-semibold text-[20px]'>Transactions</h3>
        {currentPath !== '/transactions' && (
        <div className='flex gap-4 items-center justify-center'>
          <button className='bg-transparent border-none'>
            <Link to='/transactions'>View All</Link>
          </button>
          <span>
            <Icon icon={<FaArrowRight />} />
          </span>
        </div>
        )}
      </div>
      <div>
        <div className='flex gap-4'>
          <button className='hover:border-b-2 hover:border-white px-4'>All</button>
          <button className='hover:border-b-2 hover:border-white px-4'>Revenue</button>
          <button className='hover:border-b-2 hover:border-white px-4'>Expense</button>
        </div>
        {currentTransactions.map((transaction) => {
          const { _id, type, amount, date } = transaction;
          return (
            <div className='flex justify-center mt-8 items-center w-full md:w-11/12' key={_id}>
              <div className='flex items-center justify-center w-2/3 gap-10'>
                <div className='flex items-center w-1/3'>
                  <Icon icon={<FaTv />} />
                </div>
                <div className='flex flex-col gap-2 w-2/3'>
                  <h3 className='text-[16px] font-semibold'>Gaming Items</h3>
                  <p className='text-[12px] font-thin'>
                    <DateTimeFormat value={date} size={17} />
                  </p>
                </div>
              </div>
              <div className='w-1/3 flex justify-center items-center'>
                {type === 'add' && (
                  <p className='text-[15px] font-bold'>
                    <CurrencyFormat value={amount} size={17} />
                  </p>
                )}
                {type === 'withdraw' && (
                  <p className='text-[15px] font-bold text-red-700'>
                    - <CurrencyFormat value={amount} size={17} />
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={transactions.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

const Icon = ({ icon }) => (
  <span>
    <a href='#'>{icon}</a>
  </span>
);

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

  return (
    <nav className='mt-20'>
      <ul className='flex justify-center'>
        {pageNumbers.map((number) => (
          <li key={number} className='mx-2'>
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TransactionsTable;
