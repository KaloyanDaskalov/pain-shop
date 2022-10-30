import './App.css'
import Footer from './components/footer'
import Home from './pages/home'
import Navigation from './components/navigation'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
