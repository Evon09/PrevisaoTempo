import {
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";
import { useState } from "react";
import ICON from "../../../assets/icons/icon.png";

export function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [texto, setTexto] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Redireciona para a rota com base no texto inserido
    navigate(`/local/${texto}`);
  };

  return (
    <Flex
      p="5"
      gap="3"
      w="100%"
      alignItems="center"
      direction={["column", "column", "row"]}
    >
      <Link to="/">
        <Flex>
          <Image src={ICON} w="60px" h="60px"></Image>
          <Flex direction="column">
            <Heading>TimeNow</Heading>
            <Text>Previsao do tempo</Text>
          </Flex>
        </Flex>
      </Link>
      <Flex direction={["column", "column", "row"]} gap="10px">
        <form onSubmit={handleSubmit}>
          <Input
            variant="outline"
            w="50vw"
            placeholder="Escolha um local 🌎"
            onChange={(e) => setTexto(e.target.value)}
          />
          <Button
            width="full"
            mt={4}
            colorScheme="teal"
            type="submit"
            display="none"
          >
            Pesquisar
          </Button>
        </form>

        <Flex gap="10px">
          {!auth.email ? (
            <Button as={Link} w="auto" to={"/register"}>
              Registrar
            </Button>
          ) : (
            <></>
          )}

          {!auth.email ? (
            <Button as={Link} w="auto" to={"/login"}>
              Login
            </Button>
          ) : (
            <Button w="auto" onClick={auth.logout}>
              Logout
            </Button>
          )}
          {auth.email ? (
            <Button as={Link} w="auto" to={"/perfil"}>
              Perfil
            </Button>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
      <Spacer />
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
}
