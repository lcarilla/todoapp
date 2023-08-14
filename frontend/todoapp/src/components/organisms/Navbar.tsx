import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const auth = useAuth();
  const handleAuthButtonClick = () => {
    if (auth.isAuthenticated) auth.removeUser();
    if (!auth.isAuthenticated) auth.signinRedirect();
  };
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to={"/"}>
          <Box>HaraldTodo v1</Box>
        </Link>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} bg="blue.500" />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <Link to={"https://id.lab.lcarilla.de/realms/TEST/account"}>
                  <MenuItem>Your Account</MenuItem>
                </Link>
                <MenuItem onClick={handleAuthButtonClick}>
                  {auth.isAuthenticated ? "Logout" : "Login"}
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
