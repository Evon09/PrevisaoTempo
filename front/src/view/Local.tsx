// src/view/Local.tsx
import React from "react";
import { Center, Flex, Spacer } from "@chakra-ui/react";
import { Header } from "../components/commons/Header";

import Footer from "../components/commons/footer";
import { useParams } from "react-router-dom";
import { LocalCard } from "../components/card/LocalCard";

const Local: React.FC = () => {
  let { local } = useParams();
  return (
    <Flex direction="column" h="100vh" align="center" justify="space-between">
      <Header />
      <Center flexDirection="column">
        <LocalCard local={local?.toString() || ""} />
      </Center>
      <Spacer></Spacer>
      <Footer />
    </Flex>
  );
};
export default Local;
