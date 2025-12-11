import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <nav>
        <h1>Shipping Box</h1>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/">Add box</Link>
          <Link to="/list">Box list</Link>
        </div>
      </nav>
    </div>
  );
}
