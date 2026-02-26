import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Landing</Link> |{" "}
      <Link to="/home">Home</Link> |{" "}
      <Link to="/pessoas">Pessoas</Link> |{" "}
      <Link to="/conhecimentos">Conhecimentos</Link>
    </nav>
  );
}

export default Navbar;