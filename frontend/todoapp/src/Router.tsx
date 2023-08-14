import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./templates/Layout";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";

export const Router = createBrowserRouter(
  createRoutesFromElements([
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo/:id" element={<TodoPage />} />
      </Route>
    </>,
  ])
);
