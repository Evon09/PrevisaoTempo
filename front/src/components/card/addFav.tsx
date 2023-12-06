import { Flex, Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { FaHeart } from "react-icons/fa"; // Importação do ícone FaHeart
import { useAuth } from "../../contexts/auth";

export function AddFavorite({ cidade }: { cidade: string }) {
  const auth = useAuth();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/checkFavorite?userId=${auth.id}&favoriteName=${cidade}`
        );
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error("Erro ao verificar se é um favorito:", error);
      }
    };

    checkIfFavorite();
  }, [cidade, auth.id]);

  const favoriteRemove = async () => {
    try {
      const response = await fetch("http://localhost:3001/removeFavorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.id,
          favoriteName: cidade,
        }),
      });

      setIsFavorite(false);
      if (response.ok) {
      } else {
        console.error("Erro ao remover favorito:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const addToFavorites = async () => {
    try {
      await fetch("http://localhost:3001/addFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.id,
          favoriteName: cidade,
        }),
      });

      setIsFavorite(true);
    } catch (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
    }
  };

  return (
    <Button
      onClick={() => {
        if (isFavorite) {
          favoriteRemove();
        } else {
          addToFavorites();
        }
      }}
      bg="transparent"
      _hover={{ bg: "transparent" }}
    >
      <Flex
        fontSize="70px"
        alignItems={"baseline"}
        bg="rgba(255, 255, 255, 0.4)" // Fundo translúcido
        boxShadow="0 0 10px rgba(255, 255, 255, 0.2)" // Sombra translúcida
        backdropFilter="blur(10px)" // Aplica o desfoque
        borderRadius="20px"
        p="5px"
        justify="center"
        align="center"
      >
        <FaHeart color={isFavorite ? "red" : "black"} size="20px" />
      </Flex>
    </Button>
  );
}
