import {
  Box,
  Button,
  FormControl,
  Heading,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from '@chakra-ui/react';

import PasswordTextField from '../components/PasswordTextField';
import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfil, resetUpdateSuccess } from '../redux/actiuni/userActiuni';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import TextField from '../components/TextField';

const ProfilScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if(updateSuccess) {
        toast({description: 'Profil actualizat.', status: 'success', isClosable: true})
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Formik
      initialValues={{ email: userInfo.email, password: '', name: userInfo.nume, confirmPassword: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Numele este obligatoriu'),
        email: Yup.string().email('Email gresit').required('Necesita adresa de email.'),
        password: Yup.string()
          .min(1, 'Parola este prea scurta - trebuie sa contina cel putin 6 caractere')
          .required('Parola este obligatorie'),
        confirmPassword: Yup.string()
          .min(1, 'Parola este prea scurta - trebuie sa contina cel putin 6 caractere')
          .required('Parola este obligatorie')
          .oneOf([Yup.ref('password'), null], 'Parolele trebuie sa corespunda'),
      })}
      onSubmit={(values) => {
        dispatch(resetUpdateSuccess());
        dispatch(updateProfil(userInfo._id, values.name, values.email, values.password))
      }}
    >
      {(formik) => (
        <Box
          minH="100vh"
          maxW={{ base: '3xl', lg: '7xl' }}
          mx="auto"
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack spacing='10' direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
            <Stack flex="1.5" mb={{ base: '2xl', md: 'none' }}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Profil
              </Heading>
              <Stack spacing="6">
                <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status="error"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <AlertIcon />
                      <AlertTitle>Ne pare rau!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <TextField type="text" name="name" placeholder="Nume si Prenume." label="Nume complet" />
                      <TextField type="text" name="email" placeholder="nume@gmail.com" label="Email" />
                      <PasswordTextField type="password" name="password" placeholder="parola dv" label="Password" />
                      <PasswordTextField
                        type="password"
                        name="confirmPassword"
                        placeholder="confirma parola"
                        label="Password"
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing='6'>
                    <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                        Salvare
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1' _dark={{bg: 'grey.900'}}>
                <Card>
                    <CardHeader>
                        <Heading size='md'>Raport User</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider/>} spacing='4'>
                            <Box pt='2' fontSize='sm'>
                                Inregistrat in data de: {new Date(userInfo.createdAt).toDateString()}
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProfilScreen;
