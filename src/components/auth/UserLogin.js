import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Google from './GoogleLogin';


const UserLogin = (props) => {
  // use Navagations
  const navigate = useNavigate();


  // for open doalog 
  const [login,setLogin] = useState(false)

  const onHide = () => {
    setLogin(false)
    formik.resetForm();
  }


  // formik on submit form
  // const [formData,setFormData] = useState()

  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
    },
    validate: (data) => {
      let errors = {};

      if (!data.username) {
          errors.username = 'Username is required.';
      }
      if (!data.password) {
        errors.password = 'Password is required.';
      }
      return errors;
    },
    onSubmit: (data) => {
      // setFormData(data);
      // console.log(data)
      userAuthlogin(data)
      formik.resetForm();
    }

  })

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const sum = []
    function check(id_name){
      sum.push({
        value: id_name.value,
        id: id_name.id,
      })
      document.getElementById(id_name)

      console.log('Checking')
    }

  // api to login a user in fake store api 
  
  const userAuthlogin = async (data)=>{

      const userdata = {
        username:data.username,
        password:data.password,
      }

      await axios.post(`https://fakestoreapi.com/auth/login`,userdata)
      .then(function (response) {
        // handle success
        if(response.status === 200) {
          localStorage.setItem("auth",JSON.stringify(response.data.token))
          setLogin(false)
          props.SetSession(true)
          // navigate("/blog");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }





  return (
    <>
    <button onClick={()=>{setLogin(true)}} className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">Login</button>

    <Dialog header="Sign in to your account" style={{width:"60vh"}} visible={login} onHide={() => onHide()} >
      <section>              
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
            <input type="text"
             name="username"
             value={formik.values.username}
              onChange={formik.handleChange}
             
             id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ramu" />
            {getFormErrorMessage('username')}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password"
            value={formik.values.email} 
            onChange={formik.handleChange}
            
            name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {getFormErrorMessage('password')}
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
              </div>
            </div>
          </div> */}
          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
        </form>


        {/* <Google /> */}
      </section>
      </Dialog>
    </>
  )
}

export default UserLogin
