import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useAuth } from "react-oidc-context";
const StartScreen = () => {
  const gradientColors = "linear(to-r, teal.300, blue.500)"; // Adjust gradient colors as needed
  const auth = useAuth();
  return (
    <Center mt={"150"}>
      <Box textAlign="center" p="6" bgGradient={gradientColors} bgClip="text">
        <Heading size="4xl" mb="10">
          HaraldTodo
        </Heading>
        <Heading size="xl" mb="10">
          Yet another todo app with some unique useless features
        </Heading>
        <Button size="lg" onClick={() => auth.signinRedirect()}>
          Sign In
        </Button>
      </Box>
    </Center>
  );
};

export default StartScreen;
