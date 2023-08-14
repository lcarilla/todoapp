import { Button, Flex, Heading, Input, List } from "@chakra-ui/react";
import { Comment, TodosApi } from "../../api";
import TodoComment from "../atoms/TodoComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useState } from "react";

const TodoComments = (props: { comments: Comment[]; todoId: number }) => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const { mutateAsync } = useMutation({
    mutationFn: async (comment: Comment) => {
      await TodosApi.postComment(props.todoId, comment, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      queryClient.invalidateQueries(["todos" + props.todoId]);
    },
  });
  const onButtonClick = () => {
    mutateAsync({
      id: 0,
      content: input,
      created: new Date().toISOString(),
    });
  };
  return (
    <>
      <Heading size={"md"} mb={4}>
        Milestones:
      </Heading>
      <Flex my={3}>
        <Input
          placeholder="Enter new Milestone"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button ml={5} color={"orange.300"} onClick={onButtonClick}>
          Add
        </Button>
      </Flex>

      <List spacing={3}>
        {props.comments.map((c) => (
          <TodoComment comment={c} key={c.id}></TodoComment>
        ))}
      </List>
    </>
  );
};

export default TodoComments;
