import { CheckCircleIcon } from "@chakra-ui/icons";
import { ListItem } from "@chakra-ui/react";
import { Comment } from "../../api";

const TodoComment = (props: { comment: Comment }) => {
  return (
    <ListItem>
      <CheckCircleIcon color={"green.400"} mr={2}></CheckCircleIcon>
      {new Date(Number(props.comment.created)).toDateString()} -{" "}
      {props.comment.content}
    </ListItem>
  );
};

export default TodoComment;
