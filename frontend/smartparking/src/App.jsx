import {  } from 'react'
import './App.css'
import MainLayout from './layout/MainLayout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ParkingLotPage from './pages/ParkingLotPage';
import NewPage from './pages/NewPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import ParkingLotDetailPage from './pages/ParkingLotDetailPage';
import UserInfoPage from './pages/UserInfoPage';
import SubcriptionPage from './pages/SubcriptionPage';
import HistoryBookingPage from './pages/HistoryBookingPage';
import ProductPage from './pages/ProductPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './routes/PrivateRoute.jsx'

function App() {
  return (
    <Routes>

      <Route path='/sign-in' element={<SigninPage />}></Route>
      <Route path='/sign-up' element={<SignupPage />}></Route>

      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/parking-lots' element={<ParkingLotPage />}></Route>
        <Route path='/news' element={<NewPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/parking-lots/:id/booking' element={<PrivateRoute><BookingPage /></PrivateRoute>}></Route>
        <Route path='/parking-lots/:id' element={<ParkingLotDetailPage />}></Route>
        <Route path='/user' element={<PrivateRoute><UserInfoPage /></PrivateRoute>}></Route>
        <Route path='/subcription' element={<SubcriptionPage />}></Route>
        <Route path='/history_booking' element={<PrivateRoute><HistoryBookingPage /></PrivateRoute>}></Route>
        <Route path='/products' element={<ProductPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
