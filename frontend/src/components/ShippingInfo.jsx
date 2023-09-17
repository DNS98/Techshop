import { Box, Heading, VStack, FormControl, Flex, Stack, Text, Radio, RadioGroup, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { setExpress } from '../redux/actiuni/cosActiuni';
import { setShippingAddress, setShippingAddressError } from '../redux/actiuni/orderActiuni';
import { useState } from 'react';

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);
  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <Formik
      initialValues={{ adresa: '', oras: '', codPostal: '', judet: '' }}
      validationSchema={Yup.object({
        adresa: Yup.string().required('Camp obligatoriu').min(2, 'Adresa este prea scurta'),
        oras: Yup.string().required('Camp obligatoriu').min(2, 'Numele orasului prea scurt'),
        codPostal: Yup.string().required('Camp obligatoriu').min(2, 'Cod postal prea scurt'),
        judet: Yup.string().required('Camp obligatoriu').min(2, 'Numele Judetului este prea scurt'),
      })}
    >
      {(formik) => (
        <VStack as="form">
          <FormControl
            onChange={
              Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }
          >
            <TextField name="adresa" placeholder="Adresa strada" label="Adresa strada" />
            <Flex>
              <Box flex="1" mr="10">
                <TextField name="codPostal" placeholder="Cod postal" label="Cod postal" type="number" />
              </Box>
              <Box flex="2" mr="10">
                <TextField name="oras" placeholder="Oras" label="Oras" />
              </Box>
            </Flex>
            <TextField name="judet" placeholder="Judet" label="Judet" />
          </FormControl>
          <Box w="100%" h="180px" pr="5">
            <Heading fontSize="2xl" fontWeight="extrabold" mb="10">
              Metoda Livrare
            </Heading>
            <RadioGroup
              defaultValue="false"
              onChange={(e) => {
                dispatch(setExpress(e));
              }}
            >
              <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                <Stack pr="10" spacing={{ base: '8', md: '10' }} flex="1.5">
                  <Box>
                    <Radio value="true">
                      <Text fontWeight="bold">Express 15.99</Text>
                      <Text>Livrat in 24h</Text>
                    </Radio>
                  </Box>
                  <Stack spacing="6">Express</Stack>
                </Stack>
                <Radio value="false">
                  <Tooltip label="Livrare gratis pentru comenzile peste 1000 Ron">
                    <Box>
                      <Text fontWeight="bold">Standard 4.99</Text>
                      <Text>Livrat in 2-5 zile</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInfo;
