import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Wrap,
} from '@chakra-ui/react';
import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getProdus } from '../redux/actiuni/produsActiuni';
import { addCosItem } from '../redux/actiuni/cosActiuni';
import { useEffect, useState } from 'react';

const ProdusScreen = () => {
  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast();
  //redux
  const dispatch = useDispatch();
  const produse = useSelector((state) => state.produse);
  const { loading, error, produs } = produse;

  const cosContent = useSelector((state) => state.cos);
  const { cos } = cosContent;

  useEffect(() => {
    dispatch(getProdus(id));
  }, [dispatch, id, cos]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    dispatch(addCosItem(produs._id, amount));
    toast({ description: 'Produsul a fost adugat.', status: 'success', isClosable: true });
  };

  return (
    <Wrap spacing="30px" justify="center" minH="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner mt={20} thickness="2px" speed="0.7s" emptyColor="gray.200" color="orange.500" size="xl" />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Ne pare rau!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        produs && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex="1.5"
                mb={{ base: '12', md: 'none' }}
              >
                {produs.produsIsNew && (
                  <Badge rounded="full" w="40px" fontSize="0.8em" colorScheme="green">
                    NOU
                  </Badge>
                )}
                {produs.stoc === 0 && (
                  <Badge rounded="full" w="100px" fontSize="0.8em" colorScheme="red">
                    Stoc Epuizat
                  </Badge>
                )}
                <Heading fontSize="2xl" fontWeight="extrabold">
                  {produs.nume}
                </Heading>
                <Stack spacing="5">
                  <Box>
                    <Text fontSize="xl">${produs.pret}</Text>
                    <Flex>
                      <HStack spacing={'2px'}>
                        <StarIcon color="orange.500" />
                        <StarIcon color={produs.rating >= 2 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={produs.rating >= 3 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={produs.rating >= 4 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={produs.rating >= 5 ? 'orange.500' : 'gray.200'} />
                      </HStack>
                      <Text fontSize="md" fontWeight="bold" ml="4px">
                        {produs.numReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{produs.descriere}</Text>
                  <Text fontWeight={'bold'}>Cantitate</Text>
                  <Flex w="170px" p="5px" border="1px" borderColor="gray.200" alignItems="center">
                    <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
                      <MinusIcon />
                    </Button>
                    <Text mx="30px">{amount}</Text>
                    <Button isDisabled={amount >= produs.stoc} onClick={() => changeAmount('plus')}>
                      <SmallAddIcon w="20px" h="25px" />
                    </Button>
                  </Flex>
                  <Button isDisabled={produs.stoc === 0} colorScheme="orange" onClick={() => addItem()}>
                    Adauga Cos
                  </Button>
                  <Stack width="350px">
                    <Flex alignItems="center">
                      <BiPackage size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        Livrare gratuita pentru comenzile peste $1000
                      </Text>
                    </Flex>

                    <Flex alignItems="center">
                      <BiCheckShield size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        2 ani garantie la orice produs
                      </Text>
                    </Flex>

                    <Flex alignItems="center">
                      <BiSupport size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        Suport tehnic 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction="column" align="center" flex="1" _dark={{ bg: 'gray.900' }}>
                <Image mb="30px" src={produs.image} alt={produs.nume} />
              </Flex>
            </Stack>
            <Stack>
              <Text fontSize="xl" fontWeight="bold">
                Reviews
              </Text>
              <SimpleGrid minChildWidth="300px" spacingX="40" spacingY="20px">
                {produs.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing="2px" alignItems="center">
                      <StarIcon color="orange.500" />
                      <StarIcon color={review.rating >= 2 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 3 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 4 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 5 ? 'orange.500' : 'gray.200'} />
                      <Text fontWeight="semibold" ml="4px">
                        {review.titlu && review.titlu}
                      </Text>
                    </Flex>
                    <Box py="12px">{review.comment}</Box>
                    <Text fontSize="sm" color="gray.400">
                      de {review.nume}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>

          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProdusScreen;
