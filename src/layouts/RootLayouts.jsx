import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../pages/Shared/Navbar'
import { Footer } from '../pages/Shared/Footer'

export const RootLayouts = () => {
  return (
    <div className=''>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
