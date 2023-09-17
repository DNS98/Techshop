import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCosItem } from '../redux/actiuni/cosActiuni';

const Rating = ({ rating, numReviews }) => {
  const { iconSize } = useState('14px');
  return (
    <Flex>
      <HStack spacing="2px">
        <StarIcon size={iconSize} w="14px" color="orange.500" />
        <StarIcon size={iconSize} w="14px" color={rating >= 2 ? 'orange.500' : 'gray.200'} />
        <StarIcon size={iconSize} w="14px" color={rating >= 3 ? 'orange.500' : 'gray.200'} />
        <StarIcon size={iconSize} w="14px" color={rating >= 4 ? 'orange.500' : 'gray.200'} />
        <StarIcon size={iconSize} w="14px" color={rating >= 5 ? 'orange.500' : 'gray.200'} />
      </HStack>
      <Text fontSize="md" fontWeight="bold" ml="4px">
        {`${numReviews} ${numReviews === 1 ? 'Review' : 'Reviews'}`}
      </Text>
    </Flex>
  );
};

const ProdusCard = ({ produs }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const cosInfo = useSelector((state) => state.cos);
  const { cos } = cosInfo;

  const addItem = (id) => {
    if (cos.some((cosItem) => cosItem.id === id)) {
      toast({
        description: 'Acest produs este deja in cos.',
        status: 'error',
        isClosable: true,
      });
    } else {
      dispatch(addCosItem(id, 1));
      toast({ description: 'Produsul a fost adaugat', status: 'success', isClosable: true });
    }
  };

  return (
    <Stack
      p="2px"
      spacing="3px"
      bg={useColorModeValue('white', 'grey.800')}
      minW="240px"
      h="450px"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
    >
      {produs.produsIsNew && <Circle size="10px" position="absolute" top={2} right={2} bg="green.300" />}
      {produs.stoc <= 0 && <Circle size="10px" position="absolute" top={2} right={2} bg="red.300" />}
      <Image src={produs.image} alt={produs.nume} roundedTop="lg" />

      <Box flex="1" maxH="5" alignItems="baseline">
        {produs.stoc <= 0 && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            Stoc Epuizat
          </Badge>
        )}
        {produs.produsIsNew && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
            Nou
          </Badge>
        )}
      </Box>

      <Flex mt="1" justifyContent="space-between" alignContent="center">
        <Link as={ReactLink} to={`/produs/${produs._id}`} pt="2" cursor="pointer">
          <Box fontSize="2xl" fontWeight="semibold" lineHeight="tight">
            {produs.nume}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent="space-between" alignContent="center" py="2">
        <Rating rating={produs.rating} numReviews={produs.numReviews} />
      </Flex>
      <Flex justify="space-between">
        <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
          <Box as="span" color={'gray.600'} fontSize="xl" ml='5px'>
            €
          </Box>
          {Number(produs.pret.toFixed(2))}
        </Box>
        <Tooltip label="Adauga cos" bg="white" placement="bottom" color="gray.800" fontSize="1em">
          <Button variant="ghost" display="flex" isDisabled={produs.stoc <= 0} onClick={() => addItem(produs._id)}>
            <Icon as={FiShoppingCart} h={7} w={7} alignSelf="center" />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProdusCard;
