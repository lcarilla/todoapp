import { Box, Button, Heading } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router-dom";
import { TodoFullDto, TodoDto, TodosApi, Comment } from "../../api";
import TodoComments from "./TodoComments";

const TodoStats = () => {
  const auth = useAuth();
  const params: any = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: todo } = useQuery<TodoFullDto>({
    queryKey: ["todos" + params.id],
    queryFn: async () => {
      const response = await TodosApi.getTodo(params.id, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return response.data;
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (todo: TodoDto) => {
      await TodosApi.deleteTodo(todo.id as number, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      navigate("/");
    },
  });
  return (
    todo && (
      <>
        <Box w={"800px"} p={5} maxW={"100vw"}>
          <Heading size="2xl" m={6}>
            {todo.name} - {new Date(todo.date as any).toDateString()}
          </Heading>
          <Heading size="lg" m={6}>
            {todo.description}
          </Heading>
          <Heading size="md" m={6}>
            Progress: {todo.progress}%
          </Heading>
          <Button
            colorScheme="orange"
            onClick={() => deleteMutation.mutateAsync(todo)}
            size={"lg"}
            m={4}
          >
            Delete Todo
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => navigate("/")}
            size={"lg"}
            m={4}
          >
            Back
          </Button>
        </Box>
        <Box p={9}>
          <TodoComments
            comments={[...(todo.comments as Comment[])].reverse()}
            todoId={todo.id as number}
          ></TodoComments>
        </Box>
      </>
    )
  );
};

export default TodoStats;
