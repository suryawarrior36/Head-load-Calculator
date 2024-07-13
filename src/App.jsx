import React from 'react'
import HomePageComponent from './components/HomePageComponent/HomePageComponent'
import { Link, Route, Routes } from 'react-router-dom'
import InputComponent from './components/InputComponent/InputComponent'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <>
    <nav>
      <div className='nav-left'>
      <img src='src\assets\Dayana logo.png' alt='Logo' className='logo' />
      <h1>Dayana Airconditioners</h1>
      </div>
      <div className='nav-right'>
      <ul>
        {/* <li><Link to='/'>Home</Link></li> */}
        <li><Link to='calc'>Calculator</Link></li>
      </ul>
      </div>
    </nav>
    <Routes>
      {/* <Route path='/' element={<HomePageComponent/>} /> */}
      <Route path='/calc' element={<InputComponent/>} />
    </Routes>
    </>
  )
}

export default App