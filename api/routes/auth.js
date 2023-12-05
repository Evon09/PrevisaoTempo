const express = require("express");
var router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
//obter todos os usuarios
router.get("/", async (req, res) => {
  const users = await User.find();
  return res.json(users);
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

//Cadastro do usuario
router.post("/", async (req, res) => {
  const user = req.body;
  const result = await User.create(user);

  return res.json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(400).json({
      message: "Informe um ID valido",
    });
  }
  const result = await User.deleteOne({ _id: id });
  return result.deletedCount > 0
    ? res.send()
    : res.status(404).json({
        message: "Nada encontrado",
      });
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userJson = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Isso não é um ID válido",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Erro na validação do ID",
    });
  }

  try {
    const userConfere = await User.findById(id);

    if (userConfere) {
      userJson.updatedAt = Date.now();
      userJson.createdAt = userConfere.createdAt;

      const hasError = new User(userJson).validateSync();
      if (hasError) {
        const errors = {};
        for (const field in hasError.errors) {
          errors[field] = hasError.errors[field].message;
        }
        return res.status(400).json({ errors });
      }

      await User.updateOne({ _id: id }, userJson);
      return res.status(200).json(userJson);
    } else {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Validando se os campos obrigatórios não estão vazios
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Por favor, preencha todos os campos obrigatórios.",
    });
  }

  try {
    // Verificando se o usuário já existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Este email já está sendo usado por outro usuário.",
      });
    }

    // Criando um novo usuário
    const newUser = await User.create({ name, email, password });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor ao tentar cadastrar o usuário.",
    });
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validando se os campos obrigatórios não estão vazios
  if (!email || !password) {
    return res.status(400).json({
      message: "Por favor, forneça seu email e senha para fazer login.",
    });
  }

  try {
    // Verificando se o usuário existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado. Por favor, verifique seu email.",
      });
    }

    // Verificando a senha
    if (user.password !== password) {
      return res.status(401).json({
        message: "Senha incorreta. Por favor, tente novamente.",
      });
    }
    // Você pode gerar um token JWT aqui e enviá-lo de volta para a aplicação

    return res.status(200).json({
      message: "Login bem-sucedido!",
      user,
      // token: ... (gerar e enviar o token JWT se necessário)
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor ao tentar fazer login.",
    });
  }
});

module.exports = router;
