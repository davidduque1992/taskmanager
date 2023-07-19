import { Route, Routes } from "react-router-dom";
import Saludo from "../views/saludo";
import Home from "../views/task";
import NoFound from "../views/pages/404nofound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Saludo />} />
      <Route path="/saludo" element={<Saludo />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
}

export default Router;
