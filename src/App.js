//authorization to verify email page

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

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">
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

      </Routes>
    </div>
  );
}

export default App;
