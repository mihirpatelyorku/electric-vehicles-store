import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Shop from './pages/Shop'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/About" element={<About />}/>
          <Route path="/Cart" element={<Cart />}/>
          <Route path="/Checkout" element={<Checkout />}/>
          <Route path="/Shop" element={<Shop />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App


