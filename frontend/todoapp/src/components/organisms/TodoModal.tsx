import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TodoDto, TodosApi } from "../../api";
import { useAuth } from "react-oidc-context";
const TodoModal = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync } = useMutation({
    mutationFn: async (todo: TodoDto) => {
      const response = await TodosApi.postTodo(todo, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return response.data;
    },
  });
  const onSubmit = async () => {
    await mutateAsync({
      id: 0,
      name: name,
      description: description,
      date: date,
      progress: 0,
    });
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen} size={"lg"} m={7}>
        Create Todo
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                placeholder="Todo Title"
                size="lg"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                size="lg"
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                placeholder="Todo Description"
                size="lg"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={4} onClick={onSubmit}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoModal;
