import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard";

export const LINKS = {
  DASHBOARD: {
    name: "dashboard",
    path: "/",
    element: <Dashboard />,
  },
  TICTACTOE: {
    name: "tic-tac-toe",
    path: "/tic-tac-toe",
    element: <p>Tic Tac Toe</p>,
  },
  SLIDINGPUZZLE: {
    name: "sliding-puzzle",
    path: "/sliding-puzzle",
    element: <p>Sliding Puzzle</p>,
  },
};

export const routers = createBrowserRouter([
  {
    element: <App />,
    children: [LINKS.DASHBOARD, LINKS.TICTACTOE, LINKS.SLIDINGPUZZLE],
  },
]);
