import { Button } from "@mui/material";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, pero la página que estás buscando no existe.</p>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Ir a inicio{" "}
      </Button>
    </div>
  );
}

export default NotFound;
