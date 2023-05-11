import React from 'react'
import Sidebar from '../components/admin/Sidebar'
import Mainbar from '../components/admin/Mainbar'

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