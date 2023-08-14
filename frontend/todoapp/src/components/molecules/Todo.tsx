import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoDto, TodosApi } from "../../api";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";
const Todo = (props: { todo: TodoDto }) => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const handleSliderChange = async (p: number) => {
    await mutateAsync({
      ...props.todo,
      progress: p,
    });
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (todo: TodoDto) => {
      const response = await TodosApi.putTodo(todo.id as number, todo, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return response.data;
    },
  });
  return (
    <Card variant={"filled"} mb={3} key={props.todo.id}>
      <Link to={"/todo/" + props.todo.id}>
        <CardHeader mb={0}>
          <Heading size="md">
            {props.todo.name} -{" "}
            {new Date(Number(props.todo.date)).toDateString()}
          </Heading>
        </CardHeader>{" "}
      </Link>
      <CardBody mt={0}>
        <Text>{props.todo.description}</Text>
        <Flex justifyContent="flex-end" mt={3}>
          <Slider
            aria-label="slider-ex-4"
            defaultValue={props.todo.progress}
            onChangeEnd={handleSliderChange}
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb></SliderThumb>
          </Slider>
          <Text ml={4}>{props.todo.progress}%</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Todo;
