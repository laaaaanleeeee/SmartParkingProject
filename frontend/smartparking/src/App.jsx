import {  } from 'react'
import './App.css'
import MainLayout from './layout/MainLayout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ParkingLotPage from './pages/ParkingLotPage';
import NewPage from './pages/NewPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import ParkingLotDetailPage from './pages/ParkingLotDetailPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/parking_lots' element={<ParkingLotPage />}></Route>
        <Route path='/news' element={<NewPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/parking_lots/id/booking' element={<BookingPage />}></Route>
        <Route path='/parking_lots/id' element={<ParkingLotDetailPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
