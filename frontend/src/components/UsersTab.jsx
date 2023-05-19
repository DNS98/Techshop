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
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, resetErrorAndRemoval } from '../redux/actiuni/adminActiuni';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, userRemoval, userList } = admin;
  const { userInfo } = user;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(resetErrorAndRemoval());
    if (userRemoval) {
      toast({ description: 'Utilizatorul a fost sters.', status: 'success', isClosable: true });
    }
  }, [userRemoval, dispatch, toast]);

  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
    onOpen();
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
                  <Th>Nume</Th>
                  <Th>Email</Th>
                  <Th>Inregistrat</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        {user.nume} {user._id === userInfo._id ? '(Tu)' : ''}{' '}
                      </Td>
                      <Td> {user.email} </Td>
                      <Td> {new Date(user.createdAt).toDateString()} </Td>
                      <Td>{user.isAdmin === 'true' ? <CheckCircleIcon color="orange.500" /> : ''}</Td>
                      <Td>
                        <Button
                          isDisabled={user._id === userInfo._id}
                          variant="outline"
                          onClick={() => openDeleteConfirmBox(user)}
                        >
                          <DeleteIcon mr="5px" />
                          Sterge User
                        </Button>
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
            itemToDelete={userToDelete}
            deleteAction={deleteUser}
          ></ConfirmRemovalAlert>
        </Box>
      )}
    </Box>
  );
};

export default UsersTab;
