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
import DashboardPage from './pages/owner/DashboardPage.jsx';
import OwnerBookingPage from './pages/owner/OwnerBookingPage.jsx';
import OwnerMembershipPage from './pages/owner/OwnerMembershipPage.jsx';
import OwnerParkingLotsPage from './pages/owner/OwnerParkingLotsPage.jsx';
import OwnerRevenuePage from './pages/owner/OwnerRevenuePage.jsx';
import OwnerNotificationPage from './pages/owner/OwnerNotificationPage.jsx';
import DetectVehiclesPage from './pages/owner/DetectVehiclesPage.jsx';
import ChatPage from './pages/owner/ChatPage.jsx'

function App() {
  return (
    <Routes>

      <Route path='/sign-in' element={<SigninPage />}></Route>
      <Route path='/sign-up' element={<SignupPage />}></Route>

      <Route path='/' element={<RoleBasedLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/parking_lots' element={<ParkingLotPage />}></Route>
        <Route path='/news' element={<NewPage />}></Route>
        <Route path='/solutions' element={<SolutionPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/parking_lots/:id/booking' element={<PrivateRoute><BookingPage /></PrivateRoute>}></Route>
        <Route path='/parking_lots/:id' element={<ParkingLotDetailPage />}></Route>
        <Route path='/user' element={<PrivateRoute><UserInfoPage /></PrivateRoute>}></Route>
        <Route path='/subcription' element={<SubcriptionPage />}></Route>
        <Route path='/history_booking' element={<PrivateRoute><HistoryBookingPage /></PrivateRoute>}></Route>
        <Route path='/technologies' element={<TechnologyPage />}></Route>
        <Route path='/payment/:id' element={<PrivateRoute><PaymentPage /></PrivateRoute>} />

        <Route path='admin'>
          <Route path='manage_parking_lots' element={<ManageParkingLots />} />
          <Route path='manage_users' element={<ManageUser />} />
          <Route path='manage_bookings' element={<ManageBooking />} />
          <Route path='manage_news' element={<ManageNews />} />
          <Route path='manage_sensors' element={<ManageSensor />} />
        </Route>

        <Route path='owner'>
          <Route path='dashboard_owner' element={<DashboardPage />} />
          <Route path='owner_parking_lots' element={<OwnerParkingLotsPage />} />
          <Route path='owner_bookings' element={<OwnerBookingPage />} />
          <Route path='owner_membership' element={<OwnerMembershipPage />} />
          <Route path='owner_revenue' element={<OwnerRevenuePage />} />
          <Route path='owner_notification' element={<OwnerNotificationPage />} />
          <Route path='owner_detect_vehicles' element={<DetectVehiclesPage />} />
          <Route path='owner_chat' element={<ChatPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
