import "./App.css";
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
