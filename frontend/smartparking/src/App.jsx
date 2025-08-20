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
import UserInfoPage from './pages/UserInfoPage'
import SubcriptionPage from './pages/SubcriptionPage'
import HistoryBookingPage from './pages/HistoryBookingPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/parking-lots' element={<ParkingLotPage />}></Route>
        <Route path='/news' element={<NewPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/parking-lots/:id/booking' element={<BookingPage />}></Route>
        <Route path='/parking-lots/:id' element={<ParkingLotDetailPage />}></Route>
        <Route path='/user' element={<UserInfoPage />}></Route>
        <Route path='/subcription' element={<SubcriptionPage />}></Route>
        <Route path='/history_booking' element={<HistoryBookingPage />}></Route>
        <Route path='/products' element={<ProductPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
