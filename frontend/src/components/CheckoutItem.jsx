import { Flex, Select, useColorModeValue as mode, Image, Box, Text, Spacer, Divider } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCosItem } from '../redux/actiuni/cosActiuni';

const CheckoutItem = ({ cosItem }) => {
  const { nume, image, pret, stoc, cant, id } = cosItem;
  const dispatch = useDispatch();
  return (
    <>
      <Flex>
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={nume}
          draggable="false"
          loading="lazy"
        />
        <Flex direction="column" align="stretch" flex="1" mx="2" spacing="4">
          <Text noOfLines="2" maxW="150px">
            {nume}
          </Text>
          <Spacer />
          <Select
            maxW="64px"
            focusBorderColor={mode('orange.500', 'orange.200')}
            value={cant}
            onChange={(e) => {
              dispatch(addCosItem(id, e.target.value));
            }}
          >
            {[...Array(stoc).keys(0)].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Select>
        </Flex>
        <Box>
          <Text fontWeight="bold">€{pret}</Text>
        </Box>
      </Flex>
      <Divider bg={mode('gray.400', 'gray.800')} />
    </>
  );
};

export default CheckoutItem;
