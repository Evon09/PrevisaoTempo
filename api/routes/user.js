const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");

// Rota para adicionar um nome à lista de favoritos
router.post("/addFavorite", async (req, res) => {
  const { userId, favoriteName } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Adiciona o nome à lista de favoritos
    user.favorito.push(favoriteName);

    // Salva as alterações no banco de dados
    await user.save();

    res
      .status(200)
      .json({ message: "Nome adicionado aos favoritos com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.delete("/removeFavorite", async (req, res) => {
  const { userId, favoriteName } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Remove o nome da lista de favoritos
    const indexToRemove = user.favorito.indexOf(favoriteName);
    if (indexToRemove !== -1) {
      user.favorito.splice(indexToRemove, 1);

      // Salva as alterações no banco de dados
      await user.save();

      res
        .status(200)
        .json({ message: "Nome removido dos favoritos com sucesso" });
    } else {
      res
        .status(404)
        .json({ message: "Nome não encontrado na lista de favoritos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para verificar se o usuário possui um nome na lista de favoritos
router.get("/checkFavorite", async (req, res) => {
  const { userId, favoriteName } = req.query;

  try {
    // Verifica se o usuário existe

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se o nome está na lista de favoritos
    const isFavorite = user.favorito.includes(favoriteName);

    res.status(200).json({ isFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/listFavorites", async (req, res) => {
  const { userId } = req.query;

  try {
    // Verifica se o usuário existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Retorna a lista de favoritos do usuário
    const favorites = user.favorito;

    res.status(200).json({ favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(400).json({
      message: "Isso nem e um ID",
    });
  }
  const user = await User.findById(id);
  return user
    ? res.json(user)
    : res.status(404).json({
        message: "Nada encontrado",
      });
});

router.get("/", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

module.exports = router;
