import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import TodoStats from "../components/organisms/TodoStats";

const TodoPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth.isAuthenticated) navigate("/");
  return auth.isAuthenticated && <TodoStats></TodoStats>;
};

export default TodoPage;
