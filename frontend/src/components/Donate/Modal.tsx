import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Modal,
  VStack,
} from "@chakra-ui/react";

export default function DonationModal({ handleDonate, disclousure }: any) {
  const { isOpen, onClose } = disclousure;

  const DonateButton = ({ amount }: { amount: string }) => (
    <Button w="full" onClick={() => handleDonate(amount)} variant="outline">
      {amount} ETH
    </Button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Donate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg" fontWeight="bold" mb="20px">
            Support us!
          </Text>
          <VStack>
            <DonateButton amount="0.1" />
            <DonateButton amount="0.01" />
            <DonateButton amount="0.001" />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
