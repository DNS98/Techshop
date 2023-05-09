import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import ProduseScreen from './screens/ProduseScreen';
import CosScreen from './screens/CosScreen';
import ProdusScreen from './screens/ProdusScreen';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar/>
        <main>
          <Routes>
            <Route path='/produse' element={ <ProduseScreen /> }/>
            <Route path='/produs/:id' element={ <ProdusScreen /> }/>
            <Route path='/cos' element={ <CosScreen /> }/>
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
