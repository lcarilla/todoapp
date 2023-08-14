import { useAuth } from "react-oidc-context";
import StartScreen from "../components/molecules/StartScreen";
import { Flex, Heading } from "@chakra-ui/react";
import TodoList from "../components/organisms/TodoList";
import TodoModal from "../components/organisms/TodoModal";

const HomePage = () => {
  const auth = useAuth();

  return (
    <>
      {auth.isAuthenticated || <StartScreen></StartScreen>}
      {auth.isAuthenticated && (
        <>
          <Flex alignItems="flex-start" justifyContent="space-between">
            <div>
              <Heading size="2xl" m={6}>
                Hey {auth.user?.profile.preferred_username} !
              </Heading>
              <Heading size="lg" m={6}>
                Your Todos:
              </Heading>
            </div>
            <TodoModal></TodoModal>
          </Flex>

          <TodoList></TodoList>
        </>
      )}
    </>
  );
};

export default HomePage;
