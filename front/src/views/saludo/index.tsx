import reactLogo from "../../assets/logoSolo.svg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./Styles.css";

function Saludo() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Tupaca + Task + App</h1>
      <div className="card">
        <p>
          <code>
            <h1>Bienvenido</h1>{" "}
          </code>
        </p>
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/home");
        }}
      >
        Ir a Gestor de tareas
      </Button>
    </>
  );
}

export default Saludo;
