import {Center, Wrap, WrapItem} from '@chakra-ui/react'
import ProduseCard from '../components/ProdusCard'
import {produse} from '../produse'

const ProduseScreen = () => {
  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
        {produse.map((produs) => (
            <WrapItem key={produs._id}>
                <Center w='250px' h='550px'>
                    <ProduseCard produs={produs}></ProduseCard> 
                </Center>
            </WrapItem>
        ))}
    </Wrap>
  )
}

export default ProduseScreen
