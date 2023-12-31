//authorization to verify email page -> open route will be partially correct

import "./App.css";
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from '../src/components/common/Navbar';
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./pages/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useSelector } from "react-redux";
import LogoutModal from './components/common/Modal'

function App() {
  const {logoutClicked} = useSelector((state)=>state.auth)
  return (
    <>
      {logoutClicked && <div className="w-screen h-screen fixed z-10 bg-richblack-800 opacity-90"></div>}

      {logoutClicked && (
        <div className="fixed w-screen h-screen flex justify-center items-center z-20">
          <LogoutModal 
          title={'Are You Sure?'} 
          text={'You will be logged out of you account'}
          buttonText={'Logout'}
          />
        </div>
        )
      }

      <div className='w-screen min-h-screen flex flex-col font-inter bg-richblack-900'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
          <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}></Route>
          <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}></Route>
          <Route path='/forgot-password' element={<OpenRoute><ForgotPassword/></OpenRoute>}></Route>
          <Route path='/verify-email' element={<VerifyEmail/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='/update-password/:id' element={<UpdatePassword/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<ContactUs/>}></Route>

          <Route path='/dashboard' element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>}>
            <Route path='my-profile' element={<MyProfile></MyProfile>}></Route>
            <Route path='settings' element={<Settings></Settings>}></Route>
          </Route>

        </Routes>
      </div>
    </>
  );
}

export default App;
