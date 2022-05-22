import {
  HStack,
  Box,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { GeneralContext } from "../../context/General";
import { connectWallet } from "../../web3/connect";
import { donate } from "../../web3/donate";
import DonationModal from "../Donate/Modal";

export default function Header() {
  const { setCurrentAccount, currentAccount } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = useState(false);
  const logoutDisclousure = useDisclosure();
  const donateDisclousure = useDisclosure();

  const toast = useToast();
  const handleConnectWallet = async () => {
    const address = await connectWallet();
    setCurrentAccount(address);
  };

  const handleDisconnectWallet = () => {
    setCurrentAccount("");
    logoutDisclousure.onClose();
  };

  const elipsisStringOnMiddle = (str: string) => {
    const strLength = str.length;
    const elipsisLength = 5;
    const elipsisString = "...";
    const elipsisStringOnMiddle =
      str.substring(0, elipsisLength) +
      elipsisString +
      str.substring(strLength - elipsisLength, strLength);
    return elipsisStringOnMiddle;
  };

  const handleDonate = async (amount: string) => {
    setIsLoading(true);
    donateDisclousure.onClose();
    const tx = await donate(ethers.utils.parseEther(amount));
    console.log(tx);
    if (tx) {
      const transaction = await tx.wait();
      if (transaction.code) {
        toast({
          title: "Error",
          description: "Insuficient funds.",
          status: "error",
        });
      } else {
        toast({
          title: "Success",
          description: "Donation successful.",
          status: "success",
        });
      }
      setIsLoading(false);
    } else {
      toast({
        title: "Error",
        description: "Transaction rejected.",
        status: "info",
      });
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <HStack
        height="70px"
        alignContent="center"
        justifyContent="space-between"
      >
        {currentAccount ? (
          <>
            <Button onClick={logoutDisclousure.onOpen}>
              {elipsisStringOnMiddle(currentAccount)}
            </Button>
            <Button onClick={donateDisclousure.onOpen}>
              {isLoading ? <Spinner /> : "Donate"}
            </Button>
          </>
        ) : (
          <Button className="waveButton" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        )}
      </HStack>

      <Modal
        isOpen={logoutDisclousure.isOpen}
        onClose={logoutDisclousure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{elipsisStringOnMiddle(currentAccount || "")}</Text>
            <HStack>
              <Text>View</Text>
              <Text>Copy address</Text>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDisconnectWallet}>Logout</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DonationModal
        disclousure={donateDisclousure}
        handleDonate={handleDonate}
      />
    </Box>
  );
}
