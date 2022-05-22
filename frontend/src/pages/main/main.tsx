import { Box, Button, Text, Progress, Flex } from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../context/General";
import { checkIfWalletIsConnected } from "../../web3/connect";
import Dropzone from "react-dropzone";

import { wave } from "../../web3/wave";

export default function Main() {
  // const allWaves = [{ address: "0x1", timestamp: new Date(), message: "test" }];
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { currentAccount, setCurrentAccount, allWaves } =
    useContext(GeneralContext);

  useEffect(() => {
    const getAccount = async () => {
      const account = await checkIfWalletIsConnected();
      setCurrentAccount(account);
    };
    getAccount();
  }, []);

  function reverseArr(input: any) {
    var ret = [];
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }

  const handleWave = () => {
    if (message.length === 0) alert("Please write a message");
    else {
      wave(setIsLoading, message, setMessage);
    }
  };

  const songs = [
    {
      title: "Amanece",
      artist: "Fer Pita",
      price: "0.2",
      genre: "Rock",
    },
    {
      title: "Ruta 66",
      artist: "Pappo",
      price: "0.9",
      genre: "Rock",
    },
    {
      title: "Malherido",
      artist: "Heroicos Sobrevivientes",
      price: "0.1",
      genre: "Rock",
    },
  ];

  return (
    <Box>
      <Text fontSize="6xl">Songchain</Text>

      {!currentAccount ? null : (
        <>
          <Text>Compose your song, upload it and wait for donations</Text>
          <Text>
            When you donate for a song to be recorded in studio, you are buying
            part of that song
          </Text>
          <Text>
            Artists will sell their song and people who donated will get some
            recompense for it
          </Text>

          <Box>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border="1px dashed gray"
                  p="20px"
                  borderRadius="md"
                  m="20px 0px"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "rgb(217, 176, 255)",
                  }}
                >
                  <input {...getInputProps()} />
                  <Text>
                    Drag 'n' drop your song here, or click to select file
                  </Text>
                </Box>
              )}
            </Dropzone>
          </Box>

          <Box>
            {songs.map((song) => (
              <Box
                border="1px solid white"
                p="15px"
                borderRadius="md"
                m="10px 0px"
              >
                <Progress
                  hasStripe
                  value={(parseFloat(song.price) / 1) * 100}
                  isAnimated
                />

                <Flex justifyContent="space-between" mt="20px">
                  <Text>{song.title}</Text>
                  <Text>{song.artist}</Text>
                  <Text>{song.genre}</Text>
                  <Flex gap="10px">
                    <Button>LISTEN</Button>
                    <Button>VOTE</Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Box>

          {/* <Box textAlign="center">
            <Box>
              <Input
                type="text"
                id="input"
                className="Input-text"
                placeholder="Message"
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                disabled={isLoading}
              />
            </Box>
            <Button onClick={handleWave} disabled={isLoading}>
              {isLoading ? "Loading..." : "Wave at Me"}
            </Button>

            <Text color="green.300" size="lg">
              Total Waves: {allWaves.length}
            </Text>

            {reverseArr(allWaves).map((wave: any, index: any) => {
              return (
                <Box
                  key={index}
                  style={{
                    backgroundColor: "#050505",
                    marginTop: "16px",
                    padding: "8px",
                  }}
                >
                  <Box>Address: {wave.address}</Box>
                  <Box>Time: {wave.timestamp.toString()}</Box>
                  <Box>Message: {wave.message}</Box>
                </Box>
              );
            })}
          </Box> */}
        </>
      )}
    </Box>
  );
}
