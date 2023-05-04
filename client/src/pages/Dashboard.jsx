import React from 'react'
import Menu from '../components/Menu'
import Fullbar from '../components/Fullbar'

const Dashboard = () => {
  return (
    <div className='flex w-full'>
      <div className='hidden md:block'>
        <Menu/>
      </div>
      <Fullbar/>
      
    </div>
  )
}

export default Dashboard