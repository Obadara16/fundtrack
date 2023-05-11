import React from 'react'
import CardDesign from '../CardDesign'
import { FaArrowRight, FaBook, FaShoppingBag, FaTv } from 'react-icons/fa'

const CardHistory = () => {
  return (
        <div className='flex flex-col gap-2'>
            <div className='mb-12'>
                <h3 className='text-[20px] font-semibold mb-3'>Cards</h3>
                <CardDesign/>
            </div>
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
                <div className='flex justify-center mt-8 items-center w-full md:w-11/12'>
                    <div className='flex items-center justify-center w-2/3 gap-10'>
                        <div className='flex items-center w-1/3'>
                            <Icon icon={<FaTv />} />
                        </div>
                        <div className='flex flex-col gap-2 w-2/3'>
                            <h3 className='text-[16px] font-semibold'>Gaming Items</h3>
                            <p className='text-[12px] font-thin'>Steam</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex justify-center'>
                        <p className='text-[15px] font-semibold'>-NGN 60.00</p>
                    </div>
                </div>
                <div className='flex justify-center mt-8 items-center w-full md:w-11/12'>
                    <div className='flex items-center justify-center w-2/3 gap-10'>
                        <div className='flex items-center w-1/3'>
                            <Icon icon={<FaShoppingBag />} />
                        </div>
                        <div className='flex flex-col gap-2 w-2/3'>
                            <h3 className='text-[16px] font-semibold'>Uniqlo T-Shirt</h3>
                            <p className='text-[12px] font-thin'>Uniqlo Website</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex justify-center'>
                        <p className='text-[15px] font-semibold'>-NGN 145.00</p>
                    </div>
                </div>
                <div className='flex justify-center mt-8 items-center w-full md:w-11/12'>
                    <div className='flex items-center justify-center w-2/3 gap-10'>
                        <div className='flex items-center w-1/3'>
                            <Icon icon={<FaBook />} />
                        </div>
                        <div className='flex flex-col gap-2 w-2/3'>
                            <h3 className='text-[16px] font-semibold'>Online Courses</h3>
                            <p className='text-[12px] font-thin'>Udemy</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex justify-center'>
                        <p className='text-[15px] font-semibold'>-NGN 75.00</p>
                    </div>
                </div>
            </div>
        </div>
  )
}
const Icon = ({ icon }) => (
    <span>
      <a href="#">{icon}</a>
    </span>
  );

export default CardHistory