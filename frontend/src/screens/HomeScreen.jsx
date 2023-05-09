import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    Skeleton,
    Stack,
    useColorModeValue,
    Text,
  } from '@chakra-ui/react'
  import { FaArrowRight } from 'react-icons/fa'
  import {Link as ReactLink} from 'react-router-dom'
  import { GiLaptop } from 'react-icons/gi'

  const HomeScreen = () => (
    <Box maxW="8xl" mx="auto" px={{ base: '0', lg: '12' }} py={{ base: '0', lg: '12' }} minH='5xl'>
      <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '10' }}>
        <Box
          width={{ lg: 'sm' }}
          transform={{ base: 'translateY(-50%)', lg: 'none' }}
          bg={{ base: useColorModeValue('orange.50', 'gray.700'), lg: 'transparent' }}
          mx={{ base: '6', md: '8', lg: '0' }}
          px={{ base: '6', md: '8', lg: '0' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack spacing={{ base: '8', lg: '10' }}>
            <Stack spacing={{ base: '2', lg: '4' }}>
            <Flex alignItems='center'>
                <Icon as={GiLaptop} h={10} w={10} color={useColorModeValue('orange.500', 'orange.300')} />
                <Text fontSize="4xl" fontWeight='bold' ml='5px'>
                Tech Shop
              </Text>
            </Flex>
              
              <Heading fontSize="2xl" fontWeight="normal">
                Explora ofertele noastre.
              </Heading>
            </Stack>
            <HStack spacing="3">
              <Link as={ReactLink} to='/produse' color={useColorModeValue('orange.500', 'orange.300')} fontWeight="extrabold" fontSize="1xl">
                Shop Now
              </Link>
              <Icon color={useColorModeValue('orange.500', 'orange.300')} as={FaArrowRight} fontSize='xl' />
            </HStack>
          </Stack>
        </Box>
        <Flex flex="1" overflow="hidden">
          <Image
            src="./images/backv2.jpg"
            alt="Computer"
            fallback={<Skeleton />}
            maxH="550px"
            minW="400px"
            objectFit="cover"
            flex="1"
          />
        </Flex>
      </Stack>
    </Box>
  )

  export default HomeScreen;