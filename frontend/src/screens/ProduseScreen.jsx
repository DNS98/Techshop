import { Center, Spinner, Wrap, WrapItem, Stack, Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react';
import ProduseCard from '../components/ProdusCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProduse } from '../redux/actiuni/produsActiuni';
import { useEffect } from 'react';

const ProduseScreen = () => {
  const dispatch = useDispatch();

  const produseList = useSelector((state) => state.produse);
  const { loading, error, produse } = produseList;

  useEffect(() => {
    dispatch(getProduse());
  }, [dispatch]);

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner mt={20} thickness='2px' speed='1s' emptyColor='gray.300' color='orange.500' size='xl'/>
        </Stack>
      ) : error ? (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Ne pare rau!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        produse.map((produs) => (
          <WrapItem key={produs._id}>
            <Center w="250px" h="550px">
              <ProduseCard produs={produs}></ProduseCard>
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};

export default ProduseScreen;
