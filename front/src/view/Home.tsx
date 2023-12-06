import { Center, Spacer } from "@chakra-ui/react";
import { Header } from "../components/commons/Header";
import { HorizontalCard } from "../components/card/horizontalCard";
import Carousel from "../components/commons/carousel";
import Footer from "../components/commons/footer";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Header />
      <Center flexDirection="column">
        <HorizontalCard />
        <Carousel />
      </Center>
      <Spacer h="50px"></Spacer>
      <Footer></Footer>
    </div>
  );
}
