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
import TechnologyPage from './pages/TechnologyPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './routes/PrivateRoute.jsx';
import RoleBasedLayout from './layout/RoleBasedLayout.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import SolutionPage from './pages/SolutionPage.jsx';
import ManageParkingLots from './pages/admin/ManageParkingLots.jsx';
import ManageUser from './pages/admin/ManageUser.jsx';
import ManageBooking from './pages/admin/ManageBooking.jsx';
import ManageNews from './pages/admin/ManageNews.jsx';
import ManageSensor from './pages/admin/ManageSensor.jsx';

function App() {
  return (
    <Routes>

      <Route path='/sign-in' element={<SigninPage />}></Route>
      <Route path='/sign-up' element={<SignupPage />}></Route>

      <Route path='/' element={<RoleBasedLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/parking-lots' element={<ParkingLotPage />}></Route>
        <Route path='/news' element={<NewPage />}></Route>
        <Route path='/solutions' element={<SolutionPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/parking-lots/:id/booking' element={<PrivateRoute><BookingPage /></PrivateRoute>}></Route>
        <Route path='/parking-lots/:id' element={<ParkingLotDetailPage />}></Route>
        <Route path='/user' element={<PrivateRoute><UserInfoPage /></PrivateRoute>}></Route>
        <Route path='/subcription' element={<SubcriptionPage />}></Route>
        <Route path='/history_booking' element={<PrivateRoute><HistoryBookingPage /></PrivateRoute>}></Route>
        <Route path='/technologies' element={<TechnologyPage />}></Route>
        <Route path='/payment/:id' element={<PrivateRoute><PaymentPage /></PrivateRoute>} />

        <Route path='admin'>
          <Route path='manage-parking-lots' element={<ManageParkingLots />} />
          <Route path='manage-users' element={<ManageUser />} />
          <Route path='manage-bookings' element={<ManageBooking />} />
          <Route path='manage-news' element={<ManageNews />} />
          <Route path='manage-sensors' element={<ManageSensor />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
