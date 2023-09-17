import {
  Box,
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
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { TbTruckDelivery } from 'react-icons/tb';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, setDelivered, resetErrorAndRemoval } from '../redux/actiuni/adminActiuni';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading, orders, deliveredFlag, orderRemoval } = admin;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
    if (orderRemoval) {
      toast({ description: 'Comanda a fost stearsa.', status: 'success', isClosable: true });
    }
    if (deliveredFlag) {
      toast({ description: 'Comanda a fost livrata.', status: 'success', isClosable: true });
    }
  }, [orderRemoval, dispatch, toast, deliveredFlag]);

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
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
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Data</Th>
                  <Th>Nume</Th>
                  <Th>Email</Th>
                  <Th>Shipping Info</Th>
                  <Th>Items comandate</Th>
                  <Th>Metoda Plata</Th>
                  <Th>Pret livrare</Th>
                  <Th>Total</Th>
                  <Th>Livrat</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td> {new Date(order.createdAt).toDateString()} </Td>
                      <Td>{order.username}</Td>
                      <Td>{order.email}</Td>
                      <Td>
                        <Text>
                          <i>Adresa: </i> {order.shippingAddress.adresa}
                        </Text>
                        <Text>
                          <i>Oras: </i> {order.shippingAddress.codPostal} {order.shippingAddress.oras}
                        </Text>
                        <Text>
                          <i>Judet: </i> {order.shippingAddress.judet}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item._id}>
                            {item.cant} x {item.nume}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.paymentMethod}</Td>
                      <Td>€{order.shippingPrice}</Td>
                      <Td>€{order.totalPrice}</Td>
                      <Td>{order.isDelivered ? <CheckCircleIcon color={'green.300'}/> : 'in curs de livrare'}</Td>
                      <Td>
                        <Flex direction='column'>
                          <Button variant="outline" onClick={() => openDeleteConfirmBox(order)}>
                            <DeleteIcon mr="px" />
                            Sterge comanda
                          </Button>
                          {!order.isDelivered && (
                            <Button mt="4px" variant="outline" onClick={() => onSetToDelivered(order)}>
                              <TbTruckDelivery />
                              <Text ml="5px">Livrat</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={orderToDelete}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
