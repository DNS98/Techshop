import {
  Button,
  Checkbox,
  Container,
  FormControl,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Stack,
  Box,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';
import PasswordTextField from '../components/PasswordTextField';
import TextField from '../components/TextField';
import { login } from '../redux/actiuni/userActiuni'


// lungime parola
const LoginScreen = () => {
const navigate = useNavigate()
const locatie = useLocation()
const dispatch = useDispatch()
const redirect = '/produse'
const toast = useToast()

const user = useSelector(state => state.user);
const {loading, error, userInfo} = user

  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if(userInfo) {
      if(locatie.state?.from) {
        navigate(locatie.state.from)
      } else {
        navigate(redirect);
      }
      toast({description: 'Login reusit.', status: 'success', isClosable:(true)});
    }
  }, [userInfo, redirect, error, navigate, locatie.state, toast])

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Email gresit').required('Necesita adresa de email.'),
        password: Yup.string()
          .min(1, 'Parola este prea scurta - trebuie sa contina cel putin 6 caractere')
          .required('Parola este obligatorie'),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH="4xl">
          <Stack spacing="8">
            <Stack spacing="8">
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={headingBR}>Logare in cont</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted"> Nu aveti cont ?</Text>
                  <Button as={ReactLink} to="/inregistrare" variant="link" colorScheme="orange">
                    Sign Up
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
              bg={{ boxBR }}
              boxShadow={{ base: 'none', md: 'xl' }}
            >
              <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status="error"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center">
                    <AlertIcon />
                    <AlertTitle>Ne pare rau!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                    <FormControl>
                        <TextField type='text' name='email' placeholder='nume@gmail.com' label='Email'/>
                        <PasswordTextField type='password' name='password' placeholder='parola dv' label='Password'/>
                    </FormControl>
                </Stack>
                <Stack spacing='6'> 
                    <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                        Sign In
                    </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
