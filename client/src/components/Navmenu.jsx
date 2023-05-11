import React from 'react'
import { useState } from 'react'
import { close, logo, menu} from '../assets'
import {navLinks} from '../constants'
import Button from './Button'
import { Link } from 'react-router-dom'

const Navmenu = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <img src={logo} alt='hoobank' className='w-[154px] h-[12px]'/>
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li
          key={nav.id}
          className={`font-poppins font-normal cursor-pointer text-[16px] hover:text-secondary ${index === navLinks.length  ? 'mr-0': 'mr-10'} text-white`} 
          >
            <a href={`#${nav.id}`}>
              {nav.title}
            </a>
          </li>
        ))}
          <Button styles="mt-0" text="Login"/>
      </ul>

      <div className=' md:hidden flex flex-1 justify-end items-center'>
        <img src={toggle ? close : menu} alt='menu' className='w-[128px] h-[28px] object-contain' onClick={()=> setToggle((prev) => !prev)}/>

        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((nav, index) => (
              <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px]  hover:text-secondary ${index === navLinks.length  ? 'mr-0': 'mb-4'} text-white`} 
              >
                <a href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))}
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px]  hover:text-secondary  text-white`} 
              >
                <Link to="/login">
                  Login
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navmenu