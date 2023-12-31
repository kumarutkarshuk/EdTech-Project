//pasted destructring from endpoints code
//loading -> done
//toast.dismiss, toastId used in class code -> checked
//not updated token in updateProfile function -> not needed

import toast from "react-hot-toast";
import { endpoints, settingsEndpoints } from "../apis";
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

  const {
    DELETE_PROFILE_API,
    CHANGE_PASSWORD_API,
    UPDATE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API
  } = settingsEndpoints

  


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
      await apiConnector('POST', SENDOTP_API, {email})
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
      await apiConnector('POST', SIGNUP_API, {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp})
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
      await apiConnector('POST', RESETPASSTOKEN_API, {email})
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
      await apiConnector('POST', RESETPASSWORD_API, formData)
      toast.dismiss(toastId)
      toast.success('Password reset successful')
      navigate('/login')
    }catch(error){
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
  }

  export async function deleteAccount(navigate, dispatch, token){
    const toastId = toast.loading('Loading...')
    try{
      await apiConnector('DELETE', DELETE_PROFILE_API, {token})
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.dismiss(toastId)
      toast.success('Account deleted successfully')
      navigate('/')
    }catch(error){
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
  }

  export async function changePassword(data, token){
    const toastId = toast.loading('Loading...')
    try{
      await apiConnector('POST', CHANGE_PASSWORD_API, {...data, token})
      toast.dismiss(toastId)
      toast.success('Password changed successfully')
    }catch(error){
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
  }

  export async function updateProfile(data, token, dispatch){
    const toastId = toast.loading('Loading...')
    try{
      const response = await apiConnector('PUT', UPDATE_PROFILE_API, {...data, token})

      localStorage.setItem('user', JSON.stringify(response.data.userDetails))
      const userImage = response.data?.userDetails?.image ? response.data.userDetails.image :
      `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`
      dispatch(setUser({...response.data.userDetails, image: userImage}))

      toast.dismiss(toastId)
      toast.success('Profile updated successfully')
    }catch(error){
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
  }

  export async function updateDisplayPicture(){
    const toastId = toast.loading('Loading...')
    try{
      
      toast.dismiss(toastId)
      toast.success('Profile updated successfully')
    }catch(error){
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
  }