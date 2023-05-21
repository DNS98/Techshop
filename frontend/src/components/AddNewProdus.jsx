import {
  Tr,
  Td,
  Tooltip,
  Button,
  VStack,
  Textarea,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { uploadProdus } from '../redux/actiuni/adminActiuni';

const AddNewProdus = () => {
  const dispatch = useDispatch()  
  const [brand, setBrand] = useState('');
  const [nume, setNume] = useState('');
  const [categorie, setCategorie] = useState('');
  const [stoc, setStoc] = useState('');
  const [pret, setPret] = useState('');
  const [produsIsNew, setProdusisNew] = useState(false);
  const [descriere, setDescriere] = useState('');
  const [image, setImage] = useState('');

  const createNewProdus = () => {
    dispatch(uploadProdus({ brand, nume, categorie, image, stoc, pret, produsIsNew, descriere }));
  };

  return (
    <Tr>
      <Td>
        <Text fontSize="sm">Nume fisier image</Text>
        <Tooltip label={'Setati numele la imagine ex: iPhone.jpg'} fontSize="sm">
          <Input size="sm" value={image} onChange={(e) => setImage(e.target.value)} placeholder="iPhone.jpg" />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize="sm">Descriere</Text>
        <Textarea
          value={descriere}
          w="270px"
          h="120px"
          onChange={(e) => {
            setDescriere(e.target.value);
          }}
          placeholder="Descriere"
          size="sm"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Brand</Text>
        <Input size="sm" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Apple" />
        <Text fontSize="sm">Nume</Text>
        <Input size="sm" value={nume} onChange={(e) => setNume(e.target.value)} placeholder="iPhone 13" />
      </Td>
      <Td>
        <Text fontSize="sm">Categorie</Text>
        <Input size="sm" value={categorie} onChange={(e) => setCategorie(e.target.value)} placeholder="Phones" />
        <Text fontSize="sm">Pret</Text>
        <Input size="sm" value={pret} onChange={(e) => setPret(e.target.value)} placeholder="399.99" />
      </Td>

      <Td>
        <Text fontSize="sm">Stoc</Text>
        <Input size="sm" value={stoc} onChange={(e) => setStoc(e.target.value)} placeholder="0" />
        <Text fontSize="sm">Produs nou ?</Text>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="produsIsNewFlag" mb="0" fontSize="sm">
            <Badge rounded="full" px="1" mx="1" fontSize="0.8em" colorScheme="green">
              Nou
            </Badge>
          </FormLabel>
          <Switch id="produsIsNewFlag" onChange={() => setProdusisNew(!produsIsNew)} isChecked={produsIsNew} />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button colorScheme="orange" w="160px" onClick={() => createNewProdus()}>
            <MdDriveFolderUpload />
            <Text ml='2'>Upload Produs</Text> 
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProdus;
