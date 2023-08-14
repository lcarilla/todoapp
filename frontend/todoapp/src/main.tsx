import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const oidcConfig = {
  authority: "https://id.lab.lcarilla.de/realms/TEST",
  client_id: "dev",
  redirect_uri: "https://todo.lab.lcarilla.de",
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider {...oidcConfig}>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
