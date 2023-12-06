import { Center, Flex } from "@chakra-ui/react";
import { Header } from "../components/commons/Header";
import Footer from "../components/commons/footer";
import { UserInfo } from "../components/user/userInfo";
import { FavList } from "../components/user/favList";

export default function Perfil() {
  return (
    <Flex direction="column" h="100vh" align="center" justify="space-between">
      <Header />
      <Center flexDirection="column">
        <UserInfo></UserInfo>
        <FavList></FavList>
      </Center>

      <Footer></Footer>
    </Flex>
  );
}
