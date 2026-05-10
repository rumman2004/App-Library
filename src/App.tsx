import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import DrCrop from './pages/App-Pages/DrCrop';
import MyCalculator from './pages/App-Pages/MyCalculator';
import Planix from './pages/App-Pages/Planix';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          {/* App Pages */}
          <Route path="apps/dr-crop" element={<DrCrop />} />
          <Route path="apps/my-calculator" element={<MyCalculator />} />
          <Route path="apps/planix" element={<Planix />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
