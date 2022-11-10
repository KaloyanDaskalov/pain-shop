import './App.css'

import { Routes, Route } from 'react-router-dom'

import Footer from './components/footer'
import Navigation from './components/navigation'
import Home from './pages/home'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Contact from './pages/contact'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
