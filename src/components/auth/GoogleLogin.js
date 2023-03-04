// import React, { useRef } from 'react'

import { GoogleLogin } from '@react-oauth/google';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';


const Google = () => {

    
// const googleLogin = useGoogleLogin({
//     flow: 'auth-code',
//     onSuccess: async (codeResponse) => {
//         console.log(codeResponse);
//         const tokens = await axios.post(
//             'http://localhost:3000/auth/google', {
//                 code: codeResponse.code,
//             });

//         console.log(tokens);
//     },
//     onError: errorResponse => console.log(errorResponse),
// });





  return (
    <GoogleLogin
        flow ='auth-code'
        onSuccess={(TokenResponse) => {
            console.log(TokenResponse)
        }}
        onError={() => {
            console.log('Login Failed');
        }}
    />
  )
}

export default Google