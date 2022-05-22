import { Box, HStack, Link, Text } from "@chakra-ui/react";

export default function Copyright() {
  return (
    <HStack color="gray.400" placeContent="center" pt="5px">
      <Box>
        with
        <Text display="inline" color="red.400">
          {" "}
          ♥{" "}
        </Text>
        by
      </Box>
      <Link color="blue.500" href="https://instagram.com/thom.beck">
        thom.beck
      </Link>
    </HStack>
  );
}
