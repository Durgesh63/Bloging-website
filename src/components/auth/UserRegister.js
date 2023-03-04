import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import axios from 'axios';

const UserRegister = () => {

    // registeration forms 
    const [register,setRegister] = useState(false)
    const onHide = () => {
        setRegister(false)
    }


    // useformik for registration

    const formik = useFormik({
        initialValues: {
            email:'',
            username: '',
            password: '',
            confirmpassword:'',
        },
        validate: (data) => {
          let errors = {};
    
          if (!data.username) {
              errors.username = 'Username is required.';
          }
          if (!data.password) {
            errors.password = 'Password is required.';
          }
          if (!data.email) {
            errors.email = 'Email is required.';
            }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }
        if (!data.confirmpassword) {
            errors.password = 'Confirm Password is required.';
          }

        if (data.confirmpassword !== data.password) {
            errors.password = 'Password Should be matched.';
            errors.confirmpassword = 'Password Should be matched.';
          }


          return errors;
        },
        onSubmit: (data) => {
          // setFormData(data);
          console.log(data)
          createUser(data)
          formik.resetForm();
        }
    
      })
    
      const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
      const getFormErrorMessage = (name) => {
            return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
        };


    // create new user or register new user
    const createUser = async (user) => {
        const users = {
            email: user.email,
            username: user.username,
            password: user.password,
            name:{
                firstname:'',
                lastname:''
            },
            address:{
                city:'',
                street:'',
                number: 0,
                zipcode:'',
                geolocation:{
                    lat:'',
                    long:''
                }
            },
            phone:''
        }

        await axios.post(`https://fakestoreapi.com/users`,users)
        .then((response)=>{
            if(response.status === 200){
                console.log(response)
                setRegister(false)
            }
        })
        .catch((err)=>{
            console.error(err);
        })

    }
    


  return (
    <>
        <button onClick={()=>{setRegister(true)}} className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">Register</button>

        <Dialog header="Create and account" style={{width:"60vh"}} visible={register} onHide={() => onHide()} >
      <section>
            <form className="space-y-4 md:space-y-6"  onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  {getFormErrorMessage('email')}
                
                </div>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                  <input type="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  name="username" id="username" placeholder="ramu" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {getFormErrorMessage('username')}

                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {getFormErrorMessage('password')}

                </div>
                <div>
                  <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="confirmpassword"
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                  name="confirmpassword" id="confirmpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {getFormErrorMessage('confirmpassword')}

                </div>
                
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                
            </form>
      </section>
      </Dialog>
    </>
  )
}

export default UserRegister
