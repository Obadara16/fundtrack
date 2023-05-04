import React from 'react'
import { logo, netflix, people01, people02, people03, spotify } from '../assets'
import { FaArrowRight, FaBook, FaFontAwesome, FaPlus, FaShoppingBag, FaTheRedYeti, FaTv, FaUser } from 'react-icons/fa'
import CardDesign from './CardDesign'


const Fullbar = () => {
  return (
    <section className='w-full  bg-primary py-10 px-10 text-white font-poppins'>
        <div className='w-full h-full'>
            <div className='top flex flex-col justify-center lg:flex-row gap-12 '>
                <div className='md:w-[25%] '>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-18 h-18 rounded-full bg-blue-400 justify-center items-center'>
                            <img src={people01} alt="profile" className='w-8 h-8'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-semibold text-[16px]'>Eleanor Pena</h3>
                            <p className='text-[14px] font-light'>eleanor@gmail.com</p>
                        </div>
                    </div>
                    <div className='w-full justify-center items-center text-center my-16'>
                        <p className='text-center'>TOTAL BALANCE</p>
                        <h3 className='font-bold text-[32px]'>$81,910</h3>
                        <p className='text-[12px]'>12.81%</p>
                        <div className='mt-4 flex gap-4 w-full justify-center'>
                            <button className='text-white px-6 py-3 bg-btn-purple-gradient'>Add Funds</button>
                             <button className='text- px-6 py-3' style={{background: "#0a010f"}}>Withdraw</button>
                        </div>
                    </div>
                    <div className='md:w-9/12'>
                        <h3 className='font-normal my-4'>QUICK TRANSFER</h3>
                        <div className='flex justify-between'>
                            <div className='flex '>
                                <div className='w-12 h-12 rounded-full flex  justify-center items-center'>
                                    <img src={people02} alt="profile" className='w-12 h-12'/>
                                </div>
                                <div className='w-12 h-12 rounded-full flex  justify-center items-center'>
                                    <img src={people03} alt="profile" className='w-12 h-12'/>
                                </div>
                                <div className='w-12 h-12 rounded-full flex  justify-center items-center'>
                                    <img src={people01} alt="profile" className='w-12 h-12'/>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <Icon icon={<FaPlus />} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:w-[45%]'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-semibold text-[20px]'>Overview</h3>
                        <p className='text-[14px] font-light'>Good Morning Eleanor</p>
                    </div>
                    <div className='w-full items-center text-center my-24 flex flex-col md:flex-row justify-between gap-24'>
                        <div className='flex-1 w-fit flex justify-between'>
                            <div className=''>
                                <p className='text-center text-[14px]'>EARNING</p>
                                <h3 className='font-light text-[24px]'>$21,500.00</h3>
                                <p className='text-[12px]'>12.81%</p>
                            </div>
                            <div className=''>
                                <Icon icon={<FaTheRedYeti />} />
                            </div>
                        </div>
                        <div className='flex-1 w-fit flex justify-between'>
                            <div className=''>
                                <p className='text-center text-[14px]'>EARNING</p>
                                <h3 className='font-light text-[24px]'>$21,500.00</h3>
                                <p className='text-[12px]'>12.81%</p>
                            </div>
                            <div className=''>
                                <Icon icon={<FaTheRedYeti />} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-16'>
                        <h3 className='font-semibold text-[24px]'>Monthly Payment</h3>
                        <div className='mt-4 flex flex-col gap-6 px-0 md:px-4'>
                            <div className='flex justify-between'>
                                <div className='flex-1 flex items-center gap-2 md:gap-4 w-full'>
                                    <div className='w-[40px] h-[30px]  flex rounded-full bg-white justify-center items-center'>
                                        <img src={netflix} alt="netflix" className='w-6 h-6'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='font-semibold text-[16px]'>Netflix</h3>
                                        <p className='text-[14px] font-light'>Pay before 15 July</p>
                                    </div>
                                </div>
                                <div className='flex-1 flex text-center items-center justify-center'>
                                    <p className='md:text-[20px]'>$20.30</p>
                                </div>
                                <div className='flex-1 flex justify-center items-center'>
                                    <button className='px-4 text-white py-2 mx-auto whitespace-nowrap bg-btn-purple-gradient '>Pay Now</button>
                                </div>
                                
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex-1 flex items-center gap-2 md:gap-4 w-full'>
                                    <div className='w-[40px] h-[30px]  flex rounded-full bg-white justify-center items-center'>
                                        <img src={spotify} alt="spotify" className='w-6 h-6'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='font-semibold text-[16px]'>Spotify</h3>
                                        <p className='text-[14px] font-light'>Pay before 15 July</p>
                                    </div>
                                </div>
                                <div className='flex-1 flex text-center items-center justify-center'>
                                    <p className='md:text-[20px]'>$30.10</p>
                                </div>
                                <div className='flex-1 flex justify-center items-center'>
                                    <button className='px-4 text-white py-2 mx-auto whitespace-nowrap bg-btn-purple-gradient'>Pay Now</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>      
                </div>
                <div className='md:w-[30%] px-6'>
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
                                    <p className='text-[15px] font-semibold'>-$60.00</p>
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
                                    <p className='text-[15px] font-semibold'>-$145.00</p>
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
                                    <p className='text-[15px] font-semibold'>-$75.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom '></div>
        </div>
    </section>
  )
}
const Icon = ({ icon }) => (
    <span>
      <a href="#">{icon}</a>
    </span>
  );

export default Fullbar