import {Box, Flex, HStack, Link, IconButton, Icon, Text, useDisclosure, Button, Stack, useColorModeValue, useColorMode} from '@chakra-ui/react';
import {Link as ReactLink} from 'react-router-dom';
import {HamburgerIcon, CloseIcon, MoonIcon, SunIconn, SunIcon } from '@chakra-ui/icons';
import {GiLaptop} from 'react-icons/gi';

const links = [
    {linkName: 'Produse', path: '/produse'},
    {linkName: 'Cos', path: '/cos'}
]

const NavLink = ({path, children}) => (
    <Link 
    as={ReactLink} 
    to={path} 
    px={2} 
    py={2} 
    rounded='md' 
    _hover={{textDecoration: 'none', bg: useColorModeValue('grey.200, grey.700') }}>
    {children}    
    </Link>    
);

const Navbar = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {colorMode, toggleColorMode} = useColorMode();
return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems='center' justify='space-between'>
            <IconButton 
            size='md'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
            display={{md: 'none'}} 
            onClick={isOpen ? onClose : onOpen} 
            />

            <HStack>
                <Link as={ReactLink} to='/'>
                    <Flex alignItems='center'>
                        <Icon 
                        as={GiLaptop} 
                        h={6} 
                        w={6} 
                        color='orange.400' 
                        />
                        <Text fontWeight='extrabold'>Tech Shop</Text>
                    </Flex>
                </Link>
                <HStack as='nav' spacing={4} display={{base: 'none', md: 'flex'}}>
                    {links.map((link) => (
                        <NavLink key={link.Name} path={link.path}>
                            {link.linkName}
                        </NavLink>
                    ))}
                </HStack>
            </HStack>
            <Flex alignItems='center'>
                <NavLink>
                    <Icon 
                        as={colorMode==='light' ? MoonIcon: SunIcon} 
                        alignSelf='center' 
                        onClick={() => toggleColorMode()}
                    />
                </NavLink>

                <Button 
                as={ReactLink}
                to='/login'
                p={2}
                fontSize='sm'
                fontWeight={400}
                variant='link'>
                   Sign in 
                </Button>

                <Button 
                as={ReactLink}
                to='/inregistrare'
                m={2}
                display={{base: 'none', md: 'inline-flex'}}
                fontSize='sm'
                fontWeight={400}
                _hover={{bg: 'orange.400'}}
                bg='orange.500'
                color='white'>
                   Sign up
                </Button>
            </Flex>    
        </Flex>
        {isOpen ? <Box pb={4} display={{md: 'none' }}>
                    <Stack as='nav' spacing={4}>
                        {links.map((link) => (
                            <NavLink key={link.Name} path={link.path}>
                                {link.linkName}
                            </NavLink>
                        ))}
                        <NavLink key='sign up' path='/iregistrare'>Sign Up</NavLink>
                    </Stack>
        </Box> : null}
    </Box>
);
    
};

export default Navbar;
