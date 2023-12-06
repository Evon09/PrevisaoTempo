import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Link,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/auth";
import { ReactNode, useEffect, useState } from "react";

import { Temp } from "../card/temp";

export function FavList() {
  const auth = useAuth();
  const [favorites, setFavorites] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/listFavorites?userId=${auth.id}`
        );
        const data = await response.json();

        if (Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          console.error(
            "A resposta da API não contém uma lista de favoritos:",
            data
          );
        }
      } catch (error) {
        console.error("Erro ao obter a lista de favoritos:", error);
      }
    };

    fetchData();
  }, [auth.id]);

  const favoriteRemove = async (favorite: string) => {
    try {
      const response = await fetch("http://localhost:3001/removeFavorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.id,
          favoriteName: favorite,
        }),
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter((name) => name !== favorite);
        setFavorites(updatedFavorites);
      } else {
        console.error("Erro ao remover favorito:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  return (
    <Table variant="simple" style={{ width: "100%" }}>
      <TableCaption>Locais Favoritos</TableCaption>
      <Thead>
        <Tr>
          <Th>Local</Th>
          <Th>Temperatura</Th>
          <Th>Remover</Th>
        </Tr>
      </Thead>

      <Tbody>
        {favorites.map((favorite) => (
          <Tr key={favorite}>
            <Td>
              <Link href={`/local/${favorite}`}>{favorite}</Link>
            </Td>
            <Td>
              <Temp cidade={favorite}></Temp>
            </Td>
            <Td>
              <Button
                bg="red"
                w="10"
                h="10"
                onClick={() => favoriteRemove(favorite)}
                _hover={{ bg: "darkRed" }}
              >
                <DeleteIcon />
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>

      <Tfoot>
        <Tr>
          <Th>Local</Th>
          <Th>Temperatura</Th>
          <Th>Remover</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}

