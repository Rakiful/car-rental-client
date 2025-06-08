import React, { useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext';

const axiosInstance = axios.create({
    baseURL : "http://localhost:3000"
})

export const useAxiosSecure = () => {
    const {user,signOutUser} = useContext(AuthContext)

    axiosInstance.interceptors.request.use(config =>{
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config ;
    })

    // response interceptor
    axiosInstance.interceptors.response.use(response=>{
        return response
    },error=>{
        console.log('error in interceptor',error)
        if(error.status === 401 || error.status === 403){
            signOutUser()
            .then(()=>{
                console.log(`sign out the user for ${error.status} status code`)
            })
            .catch(error=>{
                console.log(error)
            })
        }
        return Promise.reject(error)
    })


  return axiosInstance;
}
