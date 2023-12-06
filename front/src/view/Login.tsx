import { Flex } from "@chakra-ui/react";
import { Header } from "../components/commons/Header";
import Footer from "../components/commons/footer";
import LoginForm from "../components/form/loginForm";

export default function Login() {
  return (
    <Flex direction="column" h="100vh" align="center" justify="space-between">
      <Header />
      <LoginForm></LoginForm>
      <Footer></Footer>
    </Flex>
  );
}
