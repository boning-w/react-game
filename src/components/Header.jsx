import { Link } from "react-router-dom";
import { LINKS } from "../routers/routers";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "40px",
        backgroundColor: "#eeeeee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <nav>
        <Link to={LINKS.DASHBOARD.path}>Home</Link>
        <span> | </span>
        <Link to={LINKS.TICTACTOE.path}>Tic Tac Toe</Link>
        <span> | </span>
        <Link to={LINKS.SLIDINGPUZZLE.path}>Sliding Puzzle</Link>
      </nav>
    </header>
  );
}
