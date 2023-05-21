import {
  Box,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  Alert,
  Stack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Spinner,
  Text,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduse, resetProdusError } from '../redux/actiuni/produsActiuni';
import ProdusTableItem from './ProdusTableItem';
import AddNewProdus from './AddNewProdus';

const ProduseTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const produsInfo = useSelector((state) => state.produse);
  const { produse, produsUpdate } = produsInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProduse());
    dispatch(resetProdusError());
    if (produsUpdate) {
      toast({ description: 'Produsul a fost actualizat', status: 'success', isClosable: true });
    }
  }, [dispatch, toast, produsUpdate]);

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oh no!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner mt="20" thickness="2px" speed="0.70s" emptyColor="gray.200" color="orange.500" size="xl" />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="right">
                    <Box>
                      <Text mr="8px" fontWeight="bold">
                        Adauga produs nou
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb="4">
                <Table>
                  <Tbody>
                    <AddNewProdus />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Descriere</Th>
                <Th>Brand/Nume</Th>
                <Th>Categorie/Pret</Th>
                <Th>Stoc/Nou</Th>
              </Tr>
            </Thead>
            <Tbody>
              {produse.length > 0 && produse.map((produs) => <ProdusTableItem key={produs._id} produs={produs} />)}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProduseTab;
