import './App.css'

import { Routes, Route } from 'react-router-dom'
import { useAuth } from './state/user'
import ProtectedRoute from "./hoc/protected-route"

import Footer from './components/footer'
import Navigation from './components/navigation'
import Home from './pages/home'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Contact from './pages/contact'
import Create from './pages/create'
import Cart from "./pages/cart"
import Edit from './pages/edit'
// import Shipping from './pages/shipping'

function App() {

  const { user } = useAuth()

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        {/* <Route path='/shipping/:item' element={<Shipping />} /> */}
        <Route path='auth' element={
          <ProtectedRoute isAllowed={!Boolean(user)} redirectPath='/profile'>
            <Auth />
          </ProtectedRoute>
        } />
        <Route path='profile' element={<ProtectedRoute isAllowed={!!user} redirectPath='/auth'>
          <Profile />
        </ProtectedRoute>} />
        <Route path='create' element={<ProtectedRoute isAllowed={user?.email === 'kala_ds@yahoo.com'} redirectPath='/'>
          <Create />
        </ProtectedRoute>} />
        <Route path='edit/:itemID' element={<ProtectedRoute isAllowed={user?.email === 'kala_ds@yahoo.com'} redirectPath='/'>
          <Edit />
        </ProtectedRoute>} />
        <Route path='contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
