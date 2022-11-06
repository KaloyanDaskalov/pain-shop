import './App.css'
import Footer from './components/footer'
import Home from './pages/home'
import Navigation from './components/navigation'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/auth'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
