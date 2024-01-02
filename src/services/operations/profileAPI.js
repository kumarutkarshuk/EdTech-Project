//token not getting inserted in req body -> axios won't send get request with body

import { profileEndpoints } from "../apis"
import toast from "react-hot-toast";
import {apiConnector} from '../apiconnector'

const {
    GET_USER_ENROLLED_COURSES_API
  } = profileEndpoints

export async function getEnrolledCourses (token, setEnrolledCourses){
    const toastId = toast.loading('Loading...')
    try{
        // console.log('Printing token: ', token)
        let result = []
        const response = await apiConnector('GET', GET_USER_ENROLLED_COURSES_API, null, {Authorization: `Bearer ${token}`})
        result = response.data.data
        setEnrolledCourses(result)
        toast.dismiss(toastId)
        // console.log(result)
        return result

    }catch(error){
        toast.dismiss(toastId)
        toast.error(error.response.data.message)
    }
}
  