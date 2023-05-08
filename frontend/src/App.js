import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import ProduseScreen from './screens/ProduseScreen';
import CosScreen from './screens/CosScreen';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/produse' element={<ProduseScreen/>}></Route>
            <Route path='/cos' element={<CosScreen/>}></Route>
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
