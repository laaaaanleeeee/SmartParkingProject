import { Navigate } from "react-router-dom"
import { Route, Routes, Outlet } from "react-router-dom"
import "@/App.css"
import HomePage from "@/pages/client/HomePage"
import ParkingLotPage from "@/pages/client/ParkingLotPage"
import NewPage from "@/pages/client/NewPage"
import ContactPage from "@/pages/client/ContactPage"
import BookingPage from "@/pages/client/BookingPage"
import ParkingLotDetailPage from "@/pages/client/ParkingLotDetailPage"
import UserInfoPage from "@/pages/client/UserInfoPage"
import SubcriptionPage from "@/pages/client/SubcriptionPage"
import HistoryBookingPage from "@/pages/client/HistoryBookingPage"
import TechnologyPage from "@/pages/client/TechnologyPage"
import SigninPage from "@/pages/SigninPage"
import SignupPage from "@/pages/SignupPage"
import PrivateRoute from "@/routes/PrivateRoute"
import RoleBasedLayout from "@/layout/RoleBasedLayout"
import PaymentPage from "@/pages/client/PaymentPage"
import SolutionPage from "@/pages/client/SolutionPage"
import ManageParkingLots from "@/pages/admin/ManageParkingLots"
import ManageUser from "@/pages/admin/ManageUser"
import ManageBooking from "@/pages/admin/ManageBooking"
import ManageNews from "@/pages/admin/ManageNews"
import ManageSensor from "@/pages/admin/ManageSensor"
import DashboardPage from "@/pages/owner/DashboardPage"
import OwnerBookingPage from "@/pages/owner/OwnerBookingPage"
import OwnerMembershipPage from "@/pages/owner/OwnerMembershipPage"
import OwnerParkingLotsPage from "@/pages/owner/OwnerParkingLotsPage"
import OwnerNotificationPage from "@/pages/owner/OwnerNotificationPage"
import DetectVehiclesPage from "@/pages/owner/DetectVehiclesPage"
import PersonalInfo from "@/components/PersonalInfo"
import BookingHistory from "@/components/BookingHistory"
import MyVehicles from "@/components/MyVehicles"
import AdminChatBox from "@/pages/admin/AdminChatBox"
import OwnerChatBox from "@/pages/owner/OwnerChatBox"
import NewsDetailPage from "@/pages/client/NewsDetailPage"

function App() {
  return (
    <Routes>

      <Route path='/sign-in' element={<SigninPage />}></Route>
      <Route path='/sign-up' element={<SignupPage />}></Route>

      <Route path='/' element={<RoleBasedLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/parking_lots' element={<ParkingLotPage />}></Route>
        <Route path='/news' element={<NewPage />}></Route>
        <Route path="/news/:id/:slug" element={<NewsDetailPage />} />
        <Route path='/solutions' element={<SolutionPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/parking_lots/:id/:slug/booking' element={<PrivateRoute><BookingPage /></PrivateRoute>} />
        <Route path="/parking_lots/:id/:slug" element={<ParkingLotDetailPage />} />

        <Route path='/user' element={<PrivateRoute><UserInfoPage /></PrivateRoute>}>
          <Route index element={<Navigate to="info" />} />
          <Route path="info" element={<PersonalInfo />} />
          <Route path="history" element={<BookingHistory />} />
          <Route path="vehicles" element={<MyVehicles />} />
        </Route>

        <Route path='/subcription' element={<SubcriptionPage />}></Route>
        <Route path='/history_booking' element={<PrivateRoute><HistoryBookingPage /></PrivateRoute>}></Route>
        <Route path='/technologies' element={<TechnologyPage />}></Route>
        <Route path='/payment/:id' element={<PrivateRoute><PaymentPage /></PrivateRoute>} />

        <Route path='admin' element={<PrivateRoute><Outlet /></PrivateRoute>}>
          <Route index element={<Navigate to="manage_parking_lots" />} />
          <Route path='manage_parking_lots' element={<ManageParkingLots />} />
          <Route path='manage_users' element={<ManageUser />} />
          <Route path='manage_bookings' element={<ManageBooking />} />
          <Route path='manage_news' element={<ManageNews />} />
          <Route path='manage_sensors' element={<ManageSensor />} />
          <Route path='admin_chatbox' element={<AdminChatBox />} />
        </Route>

        <Route path='owner' element={<PrivateRoute><Outlet /></PrivateRoute>}>
          <Route index element={<Navigate to="dashboard_owner" />} />
          <Route path='dashboard_owner' element={<DashboardPage />} />
          <Route path='owner_parking_lots' element={<OwnerParkingLotsPage />} />
          <Route path='owner_bookings' element={<OwnerBookingPage />} />
          <Route path='owner_membership' element={<OwnerMembershipPage />} />
          <Route path='owner_notification' element={<OwnerNotificationPage />} />
          <Route path='owner_detect_vehicles' element={<DetectVehiclesPage />} />
          <Route path='owner_chatbox' element={<OwnerChatBox />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
