import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import { createOrder, resetOrder } from '../redux/actiuni/orderActiuni';
import CheckoutItem from './CheckoutItem';
import PayPalButton from './PayPalButton';
import { resetCos } from '../redux/actiuni/cosActiuni';
import PaymentSuccessModal from './PaymentSuccessModal';
import PaymentErrorModal from './PaymentErrorModal';

const CheckoutOrderSummary = () => {
  const { onClose: onErrorClose, onOpen: onErrorOpen, isOpen: isErrorOpen } = useDisclosure();
  const { onClose: onSuccessClose, onOpen: onSuccessOpen, isOpen: isSuccessOpen } = useDisclosure();
  const colorMode = mode('gray.600', 'gray.400');
  //redux
  const cosItems = useSelector((state) => state.cos);
  const { cos, subtotal, expressShipping } = cosItems;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
//calculare livrare
  const shipping = useCallback(
    () => (expressShipping === 'true' ? 15.99 : subtotal <= 1000 ? 4.99 : 0),
    [expressShipping, subtotal]
  );
//calculare total
  const total = useCallback(
    () => Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2),
    [shipping, subtotal]
  );

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  const onPaymentSuccess = (data) => {
    onSuccessOpen();
    dispatch(
      createOrder({
        orderItems: cos,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetCos());
  };

  const onPaymentError = () => {
    onErrorOpen();
  };

  return (
    <Stack spacing="8" rounded="xl" padding="8" width="full">
      <Heading size="md">Comanda Sumar</Heading>
      {cos.map((item) => (
        <CheckoutItem key={item.id} cosItem={item} />
      ))}

      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Livrare
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Gratis
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
          €{Number(total())}
          </Text>
        </Flex>
      </Stack>
      <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      />
      <Box align="center">
        <Text fontSize="sm"> Aveti intrebari ? sau aveti nevoie de ajutor pentru finalizarea comenzii?</Text>
        <Flex justifyContent="center" color={mode('orange.500', 'orange.300')}>
          <Flex align="center">
            <ChatIcon />
            <Text m="2">Live Chat</Text>
          </Flex>
          <Flex align="center">
            <PhoneIcon />
            <Text m="2">Telefon</Text>
          </Flex>
          <Flex align="center">
            <EmailIcon />
            <Text m="2">Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Flex justifyContent="center" my="6" fontWeight="semibold">
        <p>sau</p>
        <Link as={ReactLink} to="/produse" ml="1">
          Continua cumparaturile
        </Link>
      </Flex>
      <PaymentErrorModal onClose={onErrorClose} onOpen={onErrorOpen} isOpen={isErrorOpen} />
      <PaymentSuccessModal onClose={onSuccessClose} onOpen={onSuccessOpen} isOpen={isSuccessOpen} />
    </Stack>
  );
};

export default CheckoutOrderSummary;
