import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
} from "../controllers/task";

const router = express.Router();

// Crear una nueva tarea
router.post("/", createTask);

// Obtener una lista de todas las tareas existentes
router.get("/", getTasks);

// Mover una tarea entre estados
router.put("/:id/estado", updateTaskStatus);

// Eliminar una tarea
router.delete("/:id", deleteTask);

export default router;
