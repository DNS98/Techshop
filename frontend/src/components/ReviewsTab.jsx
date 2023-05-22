import {
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Spacer,
  Textarea,
  TableContainer,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Spinner,
  Text,
  Flex,
  Tab,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeReview } from '../redux/actiuni/adminActiuni';
import { getProduse, resetProdusError } from '../redux/actiuni/produsActiuni';

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const produsInfo = useSelector((state) => state.produse);
  const { produse, reviewRemoval } = produsInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProduse());
    dispatch(resetProdusError());
    if (reviewRemoval) {
      toast({ description: 'Review-ul a fost sters', status: 'success', isClosable: true });
    }
  }, [reviewRemoval, dispatch, toast, loading]);

  const onRemoveReview = (produsId, reviewId) => {
    dispatch(removeReview(produsId, reviewId));
  };

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
          {produse.length > 0 &&
            produse.map((produs) => (
              <Box key={produs._id}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton flex="1">
                        <Flex>
                          <Text mr="8px" fontWeight="bold">
                            {produs.nume}
                          </Text>
                          <Spacer></Spacer>
                          <Text mr="8px" fontWeight="bold">
                            ({produs.reviews.length} Reviews)
                          </Text>
                        </Flex>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb="4">
                      <TableContainer>
                        <Table size="sm">
                          <Thead>
                            <Tr>
                              <Th>Username</Th>
                              <Th>Rating</Th>
                              <Th>Titlu</Th>
                              <Th>Comentariu</Th>
                              <Th>Creat</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {produs.reviews.map((review) => (
                              <Tr key={review._id}>
                                <Td>{review.nume}</Td>
                                <Td>{review.rating}</Td>
                                <Td>{review.titlu}</Td>
                                <Td>
                                  <Textarea isDisabled value={review.comentariu} siz="sm" />
                                </Td>
                                <Td>{new Date(review.createdAt).toDateString()}</Td>
                                <Td>
                                  <Button
                                    variant="outline"
                                    colorScheme="red"
                                    onClick={() => onRemoveReview(produs._id, review._id)}
                                  >
                                    Sterge Comentariu
                                  </Button>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ReviewsTab;
