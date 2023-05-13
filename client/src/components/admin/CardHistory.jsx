import React from 'react'
import CardDesign from '../CardDesign'
import { FaArrowRight, FaBook, FaShoppingBag, FaTv } from 'react-icons/fa'
import TransactionsTable from './TransactionsTable'

const CardHistory = () => {
  return (
        <div className='flex flex-col gap-2'>
            <div className='mb-12'>
                <h3 className='text-[20px] font-semibold mb-3'>Cards</h3>
                <CardDesign/>
            </div>
            <TransactionsTable number={3}/>
        </div>
  )
}
const Icon = ({ icon }) => (
    <span>
      <a href="#">{icon}</a>
    </span>
  );

export default CardHistory