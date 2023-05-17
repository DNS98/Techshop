import {
    Modal,
    ModalBody,
    ModalContent,
    Alert,
    AlertDescription,
    AlertTitle,
    AlertIcon,
    Wrap,
    ModalOverlay,
  } from '@chakra-ui/react';
  
  const PaymentErrorModal = ({ isOpen, onClose }) => {
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Wrap justify="center" direction="column" align="center" mt="20px">
                <Alert
                  status="error"
                  varient="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  h='200px'
                >
                  <AlertIcon boxSize="60px" />
                  <AlertTitle pt="8px" fontSize="xl">
                    Plata respinsa!
                  </AlertTitle>
                  <AlertDescription>Plata nu a putut fi procesata.</AlertDescription>
                </Alert>
              </Wrap>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default PaymentErrorModal;