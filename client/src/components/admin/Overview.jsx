import React, { useContext } from 'react'
import { FaTheRedYeti } from 'react-icons/fa'
import { netflix, spotify } from '../../assets';
import { AppContext } from '../../context/usercontext';

const Overview = () => {
    const user = useContext(AppContext);
  const userInfo = user.userProfile
  return (
    <div className='w-full font-poppins'>
        <div className='flex flex-col gap-2'>
            <h3 className='font-semibold text-[20px]'>Overview</h3>
            <p className='text-[14px] font-light'>Good Morning {userInfo.firstName}</p>
        </div>
        <div className='w-full items-center text-center py-16 flex flex-col md:flex-row justify-between gap-24'>
            <div className='flex-1 w-fit flex justify-between'>
                <div className=''>
                    <p className='text-center text-[14px]'>EARNING</p>
                    <h3 className='font-light text-[24px]'>NGN 21,500.00</h3>
                    <p className='text-[12px]'>12.81%</p>
                </div>
                <div className=''>
                    <Icon icon={<FaTheRedYeti />} />
                </div>
            </div>
            <div className='flex-1 w-fit flex justify-between'>
                <div className=''>
                    <p className='text-center text-[14px]'>EXPENSES</p>
                    <h3 className='font-light text-[24px]'>NGN 21,500.00</h3>
                    <p className='text-[12px]'>12.81%</p>
                </div>
                <div className=''>
                    <Icon icon={<FaTheRedYeti />} />
                </div>
            </div>
        </div>
        <div className='mt-14'>
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
                        <p className='md:text-[20px]'>NGN 20.30</p>
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
                        <p className='md:text-[20px]'>NGN 30.10</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center'>
                        <button className='px-4 text-white py-2 mx-auto whitespace-nowrap bg-btn-purple-gradient'>Pay Now</button>
                    </div>
                    
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

export default Overview