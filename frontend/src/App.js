import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProduseScreen from './screens/ProduseScreen';
import CosScreen from './screens/CosScreen';
import ProdusScreen from './screens/ProdusScreen';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import InregistrareScreen from './screens/InregistrareScreen';
import ProfilScreen from './screens/ProfilScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import UserOrderScreen from './screens/UserOrderScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/produse" element={<ProduseScreen />} />
            <Route path="/produs/:id" element={<ProdusScreen />} />
            <Route path="/cos" element={<CosScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/inregistrare" element={<InregistrareScreen />} />
            <Route path="/profil" element={<ProfilScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/comenzile-tale" element={<UserOrderScreen />} />
            <Route path="/admin-panel" element={<AdminPanelScreen />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
