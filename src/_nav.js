import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navbar from './components/Header/Navbar'


const Nav = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Nav
