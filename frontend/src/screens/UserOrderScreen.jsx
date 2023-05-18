import {
  TableContainer,
  Stack,
  Spinner,
  AlertIcon,
  Alert,
  AlertDescription,
  Th,
  Tbody,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  Wrap,
  AlertTitle,
  Table,
  Td,
  Tr,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actiuni/userActiuni';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const UserOrderScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  },[]);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap justify="center" direction="column" align="center" mt="20px" minH="100vh">
          <Stack direction="row" spacing={4}>
            <Spinner mt={20} thickness="2px" speed="1s" emptyColor="gray.300" color="orange.500" size="xl" />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Ne pare rau!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minH="100vh">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Comanda ID</Th>
                  <Th>Comanda Data</Th>
                  <Th>Total Platit</Th>
                  <Th>Items</Th>
                  <Th>Printare Factura</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>
                      ${order.totalPrice} prin {order.paymentMethod}
                    </Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.cant} x {item.nume} (${item.pret})
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                    <Td>
                      <Button variant="outline">Factura</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default UserOrderScreen;
