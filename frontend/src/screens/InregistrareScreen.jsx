import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { inregistrare } from '../redux/actiuni/userActiuni';

const InregistrareScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/produse';
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: 'Contul dv a fost creat. Bun venit!', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '', confirmPassword: '' }}
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
        dispatch(inregistrare(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH="4xl">
          <Stack spacing="8">
            <Stack spacing="8">
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={headingBR}>Creare cont.</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted"> Aveti deja un cont? </Text>
                  <Button as={ReactLink} to="/login" variant="link" colorScheme="orange">
                    Sign in
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
                    textAlign="center"
                  >
                    <AlertIcon />
                    <AlertTitle>Ne pare rau!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <TextField type="text" name="name" placeholder="Nume Prenume" label="Nume si Prenume" />
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
                <Stack spacing="6">
                  <Button colorScheme="orange" size="lg" fontSize="md" isLoading={loading} type="submit">
                    Sign Up
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

export default InregistrareScreen;
