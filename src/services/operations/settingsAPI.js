import { settingsEndpoints } from "../apis"
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice"
import { setToken } from "../../slices/authSlice"
import {apiConnector} from '../apiconnector'
import { resetCart } from "../../slices/cartSlice"

const {
    DELETE_PROFILE_API,
    CHANGE_PASSWORD_API,
    UPDATE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API
  } = settingsEndpoints

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
      const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${data.firstName} ${data.lastName}`
      const response = await apiConnector('PUT', UPDATE_PROFILE_API, {...data, token, image: userImage})
      localStorage.setItem('user', JSON.stringify(response.data.userDetails))
      dispatch(setUser({...response.data.userDetails}))
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