import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Link,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
} from '@chakra-ui/react';

import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CosItem from '../components/CosItem';
import CosOrderSumar from '../components/CosOrderSumar';

const CosScreen = () => {
const cosInfo = useSelector((state) => state.cos);
const { loading, error, cos } = cosInfo;

const getHeadingContent = () => (cos.length === 1 ? '( 1 Item)' : `(${cos.length} Items)`);


  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner mt={20} thickness="2px" speed="1s" emptyColor="gray.300" color="orange.500" size="xl" />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon/>
          <AlertTitle>Ne pare rau!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : cos.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Cosul dumneavostra este gol.</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to="/produse">
              Click aici pentru mai multe produse.
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: '3xl', lg: '7xl' }}
          mx="auto"
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}>
                <Stack spacing={{base: '8', md: '10'}} flex='2'>
                    <Heading fontSize='2xl' fontWeight='extrabold'>
                        Cos Cumparaturi {getHeadingContent}
                    </Heading>
                    <Stack spacing='6'>
                       {cos.map((cosItem) => 
                        <CosItem key={cosItem.id} cosItem={cosItem}/>
                       )}
                    </Stack>
                </Stack>
                <Flex direction='column' align='center' flex='1'>
                    <CosOrderSumar/>

                    <HStack mt='6' fontWeight='semibold'>
                        <p>sau</p>
                        <Link as={ReactLink} to='/produse' color={mode('orange.400', 'orange.200')}>
                            Continua cumparaturile
                        </Link>
                    </HStack>
                </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CosScreen;
