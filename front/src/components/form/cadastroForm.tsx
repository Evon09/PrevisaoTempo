import React from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../contexts/auth";
import axios from "axios";

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const CadastroForm: React.FC = () => {
  const auth = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    toast({
      title: "Login bem-sucedido!",
      description: "Você está conectado.",
      status: "loading",
      duration: 500,
      isClosable: false,
    });

    try {
      await schema.validate(formData, { abortEarly: false });
      await auth.register(formData.email, formData.username, formData.password);

      toast({
        title: "Registro bem-sucedido!",
        description: "Você está registrado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Verificar se o status da resposta é 400
        if (error.response?.status === 400) {
          toast({
            title: "Erro de validação",
            description: "Por favor, corrija os campos destacados.",
            status: "error",
            duration: 5000,
            isClosable: false,
          });
        } else {
          // Outro tratamento de erro
          console.error("Erro Axios:", error.response?.data);
          toast({
            title: "Erro na solicitação",
            description: "Ocorreu um erro ao processar a solicitação.",
            status: "error",
            duration: 5000,
            isClosable: false,
          });
        }
      } else {
        // Tratar outros tipos de erro
        console.error("Erro:");
        toast({
          title: "Erro",
          description: "Ocorreu um erro.",
          status: "error",
          duration: 5000,
          isClosable: false,
        });
      }
    }
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          p={8}
          maxWidth="md"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel>Nome de usuário</FormLabel>
              <Input
                {...register("username", {
                  required: "Este campo é obrigatório",
                })}
              />
              {errors.username && (
                <FormErrorMessage>
                  <span>{errors.username.message?.toString()}</span>
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register("email", { required: "Este campo é obrigatório" })}
              />
              {errors.email && (
                <FormErrorMessage>
                  <span>{errors.email.message?.toString()}</span>
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                {...register("password", {
                  required: "Este campo é obrigatório",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <FormErrorMessage>
                  <span>{errors.password.message?.toString()}</span>
                </FormErrorMessage>
              )}
            </FormControl>

            <Button width="full" mt={4} colorScheme="teal" type="submit">
              Registrar
            </Button>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default CadastroForm;
