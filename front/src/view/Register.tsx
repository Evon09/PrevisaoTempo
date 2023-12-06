import { Flex } from "@chakra-ui/react";
import { Header } from "../components/commons/Header";
import Footer from "../components/commons/footer";
import CadastroForm from "../components/form/cadastroForm";

export default function Register() {
  return (
    <Flex direction="column" h="100vh" align="center" justify="space-between">
      <Header />
      <CadastroForm></CadastroForm>
      <Footer></Footer>
    </Flex>
  );
}
