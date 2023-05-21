import {
  Tr,
  Td,
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateProdus, deleteProdus } from '../redux/actiuni/adminActiuni';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import { useRef } from 'react';

const ProdusTableItem = ({ produs }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(produs.brand);
  const [nume, setNume] = useState(produs.nume);
  const [categorie, setCategorie] = useState(produs.categorie);
  const [stoc, setStoc] = useState(produs.stoc);
  const [pret, setPret] = useState(produs.pret);
  const [produsIsNew, setProdusisNew] = useState(produs.produsIsNew);
  const [descriere, setDescriere] = useState(produs.descriere);
  const [image, setImage] = useState(produs.image.substring(8));
  const dispatch = useDispatch();

  const onSaveProdus = () => {
    dispatch(updateProdus(brand, nume, categorie, stoc, pret, produs._id, produsIsNew, descriere, image));
  };

  const openDeleteConfirmBox = () => {
    onOpen();
  };

  return (
    <>
      <Tr>
        <Td>
          <Input size="sm" value={image} onChange={(e) => setImage(e.target.value)} />
          <Tooltip label={produs.image} fontSize="sm">
            <Image src={produs.image} boxSize="100px" fit="contain" />
          </Tooltip>
        </Td>
        <Td>
          <Textarea w="270px" h="120px" value={descriere} onChange={(e) => setDescriere(e.target.value)} size="sm" />
        </Td>
        <Td>
          <Flex direction="column" gap="2">
            <Input size="sm" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <Input size="sm" value={nume} onChange={(e) => setNume(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction="column" gap="2">
            <Input size="sm" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
            <Input size="sm" value={pret} onChange={(e) => setPret(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction="column" gap="2">
            <Input size="sm" value={stoc} onChange={(e) => setStoc(e.target.value)} />
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="produsIsNewFlag" mb="0" fontSize="sm">
                <Badge rounded="full" px="1" mx="1" fontSize="0.8em" colorScheme="green">
                  Nou
                </Badge>
              </FormLabel>
              <Switch id="produsIsNewFlag" onChange={() => setProdusisNew(!produsIsNew)} isChecked={produsIsNew} />
            </FormControl>
          </Flex>
        </Td>
        <Td>
          <VStack>
            <Button colorScheme="red" w="160px" onClick={openDeleteConfirmBox}>
              <DeleteIcon mr="5px" />
              Sterge Produs
            </Button>
            <Button colorScheme="orange" w="160px" onClick={onSaveProdus}>
              <MdOutlineDataSaverOn style={{marginRight: '5px'}} />
              Salvare
            </Button>
          </VStack>
        </Td>
      </Tr>
      <ConfirmRemovalAlert
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={produs}
        deleteAction={deleteProdus}
      />
    </>
  );
};

export default ProdusTableItem;
