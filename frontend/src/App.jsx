import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Navbar from './components/Navbar'
import ApartmentsPage from './pages/Apartments'
import ApartmentDetailsPage from './pages/ApartmentDetailsPage'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' Component={Landing} />
        <Route path='/apartments' Component={ApartmentsPage} />
        <Route path='/apartments/:apartmentId' Component={ApartmentDetailsPage} />
      </Routes>
    </Router>
    
  )
}

export default App
