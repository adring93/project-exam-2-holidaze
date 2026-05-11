import { Route, Routes } from 'react-router-dom'
import BookingsPage from './pages/BookingsPage'
import CreateVenuePage from './pages/CreateVenuePage'
import EditVenuePage from './pages/EditVenuePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ManagerDashboardPage from './pages/ManagerDashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import VenueBookingsPage from './pages/VenueBookingsPage'
import VenuePage from './pages/VenuePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/venues/:id" element={<VenuePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/manager" element={<ManagerDashboardPage />} />
      <Route path="/manager/venues/new" element={<CreateVenuePage />} />
      <Route path="/manager/venues/:id/edit" element={<EditVenuePage />} />
      <Route
        path="/manager/venues/:id/bookings"
        element={<VenueBookingsPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App