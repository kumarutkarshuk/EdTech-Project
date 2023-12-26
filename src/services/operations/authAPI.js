//pasted destructring from endpoints code
//loading -> done
//toast.dismiss, toastId used in class code -> checked

import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { setToken } from "../../slices/authSlice"
import {apiConnector} from '../apiconnector'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints


export function logout (dispatch, navigate){
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged Out')
    navigate('/')
}

export async function login (dispatch, navigate, formData){
  const toastId = toast.loading('Loading...')
  try{
    const response = await apiConnector('POST', LOGIN_API, formData)
    
    //some code for handling error can be written here
    toast.dismiss(toastId)

    toast.success('Login Successful')
    dispatch(setToken(response.data.token))
    const userImage = response.data?.user?.image ? response.data.user.image :
    `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
    //use another way of getting image in case of any error -> done

    dispatch(setUser({...response.data.user, image: userImage}))
    localStorage.setItem('token', JSON.stringify(response.data.token))
    localStorage.setItem('user', JSON.stringify(response.data.user))
    navigate('/dashboard/my-profile')


  }catch(error){
    // console.log("Error logging-in due to: ", error)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function sendOtp (navigate, email){
  const toastId = toast.loading('Loading...')
  try{
    const response = await apiConnector('POST', SENDOTP_API, {email})
    toast.dismiss(toastId)
    toast.success('OTP sent successfully')
    navigate('/verify-email')
  }catch(error){
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function signup(navigate, formData){
  
  const{firstName, lastName, email, password, confirmPassword, accountType, contactNumber,otp} = formData
  const toastId = toast.loading('Loading...')

  try{
    const response = await apiConnector('POST', SIGNUP_API, {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp})
    toast.dismiss(toastId)
    toast.success('Signup Successful')
    navigate('/login')

  }catch(error){
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }

}

export async function resetPasswordToken(email, setOtpSent){
  const toastId = toast.loading('Loading...')
  try{
    const response = await apiConnector('POST', RESETPASSTOKEN_API, {email})
    toast.dismiss(toastId)
    toast.success('Email sent successfully')
    setOtpSent(true)
  }catch(error){
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function updatePassword(formData, navigate){
  const toastId = toast.loading('Loading...')
  try{
    const response = await apiConnector('POST', RESETPASSWORD_API, formData)
    toast.dismiss(toastId)
    toast.success('Password reset successful')
    navigate('/login')
  }catch(error){
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}