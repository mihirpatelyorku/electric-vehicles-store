import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import HotDeals from "./pages/HotDeals";
import NavbarEle from "./Components/NavbarEle";
import HowFinancingWorks from "./pages/HowFinancingWorks";
import CarCalculator from "./pages/CarCalculator";
import Contact from "./pages/Contact"
function App() {
  return (
    <>
      <Router>
        <NavbarEle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/HotDeals" element={<HotDeals />} />
          <Route path="/HowFinancingWorks" element={<HowFinancingWorks />} />
          <Route path="/CarCalculator" element={<CarCalculator />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
