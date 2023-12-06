import React, { useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

function LoginForm() {
  const auth = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function onFinish() {
    toast({
      title: "Login bem-sucedido!",
      description: "Você está conectado.",
      status: "loading",
      duration: 500,
      isClosable: false,
    });
    try {
      // Validar os dados do formulário usando o schema do Yup
      await schema.validate(formData, { abortEarly: false });

      // Chamar a função onFinish com os dados válidos
      await auth.authenticate(formData.email, formData.password);

      // Exibir o toast de sucesso após a autenticação bem-sucedida
      toast({
        title: "Login bem-sucedido!",
        description: "Você está conectado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      // Lidar com os erros de validação
      const validationErrors: { [key: string]: string } = {};

      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path || ""] = error.message;
        });
      }
      console.error("Erros de validação:", validationErrors);

      // Exibir o toast de erro
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="md"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFinish();
            }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Seu email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />

              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="Sua senha"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <Button width="full" mt={4} colorScheme="teal" type="submit">
                Entrar
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default LoginForm;
