import { Flex, Text, Avatar, Card } from "@chakra-ui/react";

import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
interface UserInfoAPI {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  favorito: string[];
}

export function UserInfo() {
  const auth = useAuth();
  const [info, setInfo] = useState<UserInfoAPI | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${auth.id}`);
        const data = await response.json();

        // Adicione um log para visualizar o conteúdo de data.info

        // Verifique se 'data.info' não é nulo ou indefinido
        if (data) {
          // Usamos "any" aqui para contornar problemas de tipo específicos
          setInfo(data as any);
        } else {
          console.error(
            "A resposta da API não contém informações de usuário válidas:",
            data
          );
        }
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
      }
    };

    fetchData();
  }, [auth.id]);

  return (
    <Card p="20px" w="80vw">
      <Flex justify="space-between" direction="column" align="center">
        <Avatar name={info?.name} />
        <Text>@{info?.name || "Carregando..."}</Text>
        <Flex justify="space-between" w="80%">
          <Text>Nome: {info?.name || "Carregando..."}</Text>
          <Text>Email: {info?.email || "Carregando..."}</Text>
        </Flex>
      </Flex>
    </Card>
  );
}
