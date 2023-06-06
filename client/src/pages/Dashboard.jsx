import React from 'react'
import Sidebar from '../components/user/Sidebar'
import Mainbar from '../components/user/Mainbar'

const Dashboard = () => {
  return (
    <div className='flex w-full'>
      <div className='hidden md:block'>
        <Sidebar/>
      </div>
      <Mainbar/>
      
    </div>
  )
}

export default Dashboard