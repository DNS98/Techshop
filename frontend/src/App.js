import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import ProduseScreen from './screens/ProduseScreen';
import CosScreen from './screens/CosScreen';
import ProdusScreen from './screens/ProdusScreen';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar/>
        <main>
          <Routes>
            <Route path='/' element={ <HomeScreen /> }/>
            <Route path='/produse' element={ <ProduseScreen /> }/>
            <Route path='/produs/:id' element={ <ProdusScreen /> }/>
            <Route path='/cos' element={ <CosScreen /> }/>
          </Routes>
        </main>

        <Footer/>
      </Router>
    </ChakraProvider>
  );
};

export default App;
