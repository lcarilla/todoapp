import { useQuery } from "@tanstack/react-query";
import { TodoDto, TodosApi } from "../../api";
import { useAuth } from "react-oidc-context";
import { Box } from "@chakra-ui/react";
import Todo from "../molecules/Todo";

const TodoList = () => {
  const auth = useAuth();
  const { data: todos } = useQuery<TodoDto[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await TodosApi.getTodos({
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return response.data.reverse();
    },
  });
  {
    return (
      todos && (
        <Box paddingInline={6}>
          {todos?.map((t) => (
            <Todo todo={t} key={t.id}></Todo>
          ))}
        </Box>
      )
    );
  }
};

export default TodoList;
