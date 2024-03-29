import { Button, Flex, Heading, Stack, Text, useColorModeValue as mode, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

const CosOrderSumar = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const standardshipping = Number(4.99).toFixed(2);
  const cosItem = useSelector((state) => state.cos);
  const { subtotal } = cosItem;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate('/checkout');
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" w="full">
      <Heading size="md">Sumar Comanda</Heading>
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400') } fontSize='14px'>
            Subtotal
          </Text>
          <Text fontWeight="medium" fontSize='14px'> €{subtotal}  </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
            Livrare
          </Text>
          <Text fontWeight="medium">
            {subtotal <= 1000 ? (
              standardshipping
            ) : (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Gratis
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="md" fontWeight="extrabold">
            Total
          </Text>
          <Text fontSize="md" fontWeight="extrabold">
          €{subtotal <= 1000 ? Number(subtotal) + Number(standardshipping) : subtotal}
          </Text>
          
        </Flex>
      </Stack>
      <Button
        as={ReactLink}
        to="/checkout"
        colorScheme="orange"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CosOrderSumar;
