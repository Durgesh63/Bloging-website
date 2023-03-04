import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Blogs from './components/Blog/Blogs';
import HomeBody from './components/Home/HomeBody';
import Error404 from './components/Error/404Error';
import NewsLetter from './components/NewsLetter/NewsLetter';
import Nav from './_nav';
// import UserLogin from './components/auth/UserLogin';
// import UserRegister from './components/auth/UserRegister';


const RouterPage = () => {
  return (
    <>
    <Routes >
        <Route path='/' element={<Nav />}>
            <Route index element={<HomeBody />} />
            {/* <Route path='login' element={<UserLogin />} /> */}
            {/* <Route path='register' element={<UserRegister />} /> */}
            <Route path='dashboard' element={<h2>Dashboard</h2>} />
            <Route path='blog' element={<Blogs/>} />
            <Route path='about' element={<Blogs/>} />
            <Route path='newsletter' element={<NewsLetter />} />

            <Route path='*' element={<Error404 />}/>
        
            
            {/* <Blogs />
            <NewsLetter />
            <Error500 /> */}

        </Route>
    </Routes>
    </>
  )
}

export default RouterPage
