import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Landing from './pages/LandingPage'
import Navbar from './components/Navbar'
import ApartmentsPage from './pages/Apartments'
import ApartmentDetailsPage from './pages/ApartmentDetailsPage'
import NewApartmentPage from './pages/NewApartmentPage'
import UpdateApartmentPage from './pages/UpdateApartmentPage'
import BookingHistory from './pages/BookingListPage'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' Component={Landing} />
        <Route path='/apartments' Component={ApartmentsPage} />
        <Route path='/apartments/:apartmentId' Component={ApartmentDetailsPage} />
        <Route path='/apartments/:apartmentId/update' Component={UpdateApartmentPage} />
        <Route path='/apartments/add' Component={NewApartmentPage}/>
        <Route path='/bookings' Component={BookingHistory}/>
      </Routes>
    </Router>
    
  )
}

export default App
