import { ChakraProvider } from "@chakra-ui/react";
import theme from "./style/theme";
import AppRouter from "./AppRoutes";
import { AuthProvider } from "./contexts";

export const App = () => (
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <AppRouter></AppRouter>
    </ChakraProvider>
  </AuthProvider>
);
