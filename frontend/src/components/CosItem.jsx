import { CloseButton, Flex, Select, useColorModeValue as mode, Stack, Image, Box, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCosItem, removeCosItem } from '../redux/actiuni/cosActiuni';

const CosItem = ({ cosItem }) => {
  const { nume, image, pret, stoc, cant, id } = cosItem;
  const dispatch = useDispatch();

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <Stack direction="row" spacing="5" width="full">
        <Image rounded="lg" w="120px" h="120px" fit="cover" src={image} alt={nume} draggable="false" loading="lazy" />
        <Box px="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{nume}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w="full"
        mt={{ base: '4', md: '0' }}
        align={{ base: 'ceter', md: 'baseline' }}
        justify="space-between"
        display="flex"
      >
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
        <Text fontWeight='bold'>${pret}</Text>
        <CloseButton onClick={() => dispatch(removeCosItem(id))}/>
      </Flex>
    </Flex>
  );
};

export default CosItem;
