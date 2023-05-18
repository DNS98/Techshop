import {
  Modal,
  ModalBody,
  ModalContent,
  Button,
  Alert,
  AlertTitle,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
  ModalOverlay,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actiuni/userActiuni';
import { useDispatch } from 'react-redux';

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'Ai fost delogat', status: 'success', isClosable: 'true' });
    navigate('/produse');
  };

  return (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap justify="center" direction="column" align="center" mt="20px">
              <Alert
                status="success"
                varient="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto"
              >
                <AlertIcon boxSize="60px" />
                <AlertTitle pt="8px" fontSize="xl">
                  Plata reusita!
                </AlertTitle>
                <Stack mt='20px' minW='200px'>
                    <Button colorScheme='teal' variant='outline' as={ReactLink} to='/comenzile-tale'>
                        Comanda Dv.
                    </Button>
                    <Button colorScheme='teal' variant='outline' as={ReactLink} to='/produse'>
                        Produse
                    </Button>
                    <Button colorScheme='teal' variant='outline' onClick={logoutHandler}>
                        Logout
                    </Button>
                </Stack>
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentSuccessModal;
