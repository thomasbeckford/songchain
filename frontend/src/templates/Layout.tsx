import React from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxW="container.xl">
      <Grid
        gridTemplateAreas={`"header" "content" "footer"`}
        gridTemplateRows="0fr 2.4fr 0.3fr"
        gridTemplateColumns="1fr"
        gap="3px 1px"
        minH="100vh"
      >
        <GridItem gridArea="header">
          <Header />
        </GridItem>

        <GridItem gridArea="content" p={{ base: "10px", md: "30px" }}>
          {children}
        </GridItem>

        <GridItem gridArea="footer">
          <Footer />
        </GridItem>
      </Grid>
    </Container>
  );
}
