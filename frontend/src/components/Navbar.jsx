import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {CgProfile} from 'react-icons/cg'
import {MdLocalShipping, MdLogout} from 'react-icons/md'
import { GiLaptop } from 'react-icons/gi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actiuni/userActiuni';
import { FiShoppingCart } from 'react-icons/fi';

const CosIcon = () => {
  const cosInfo = useSelector((state) => state.cos)
  const {cos} = cosInfo;
  return (
    <Flex>
      <Text as='sub' fontSize='xs'>
        {cos.length}
        </Text>
        <Icon ml='-1.5' as={FiShoppingCart} h='4' w='7' alignSelf='center'></Icon>
      Cos
    </Flex>
  )
 }



const links = [
  { linkName: 'Produse', path: '/produse' },
  { linkName: <CosIcon/>, path: '/cos' },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded="md"
    _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200, gray.700') }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHovering, setIsHovering] = useState(false);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const toast = useToast();

  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'Ai fost delogat.', status: 'success', isClosable: true });
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack>
          <Link
            as={ReactLink}
            to="/"
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Flex alignItems="center">
              <Icon as={GiLaptop} h={8} w={8} color={isHovering ? 'red.800' : 'orange.400'} mr="7px" />
              <Text fontWeight="extrabold">Tech Shop</Text>
            </Flex>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <NavLink>
            <Icon
              as={colorMode === 'light' ? MoonIcon : SunIcon}
              alignSelf="center"
              onClick={() => toggleColorMode()}
            />
          </NavLink>
          {userInfo ? (
            <>
              <Menu>
                <MenuButton px="4" py="2" transition="all 0.4s" as={Button}>
                  {userInfo.nume} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to="/profil">
                    <CgProfile />
                    <Text ml="2">Profil</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to="/comenzi">
                    <MdLocalShipping/>
                    <Text ml="2">Comenzile tale</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml="2">Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button as={ReactLink} to="/login" p={2} fontSize="sm" fontWeight={400} variant="link">
                Sign in
              </Button>
              <Button
                as={ReactLink}
                to="/inregistrare"
                m={2}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={400}
                _hover={{ bg: 'orange.400' }}
                bg="orange.500"
                color="white"
              >
                Sign up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key="sign up" path="/inregistrare">
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
