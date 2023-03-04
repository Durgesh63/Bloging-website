import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserLogin from '../auth/UserLogin';
import UserRegister from '../auth/UserRegister';

const Navbar = () => {
  const userAuthlogin = localStorage.getItem("auth")

  // get sessions data 
  const [session , SetSession] = useState(null)


  // logout functions
  const logout = () => {
    if(localStorage.getItem("auth") || session){
      localStorage.removeItem("auth")
      SetSession(false)
    }
  }

  return (
        <>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
            <div className="flex items-center">
            <NavLink to='/'>
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            </NavLink>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Blog</span>
            </div>
            <div className="flex items-center">
              {userAuthlogin || session ?
              (<>
               <button onClick={logout} className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">Logout</button>
                </>):(<>
               <UserRegister />
                <UserLogin SetSession={SetSession} />
              </>)}
            </div>
          </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
          <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                <li>
                  <NavLink to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</NavLink>
                </li>
                <li>
                  <NavLink to="blog" className="text-gray-900 dark:text-white hover:underline">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="about" className="text-gray-900 dark:text-white hover:underline">About</NavLink>
                </li>
                <li>
                  <NavLink to="newsletter" className="text-gray-900 dark:text-white hover:underline">NewsLetter</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  );
};

export default Navbar;
