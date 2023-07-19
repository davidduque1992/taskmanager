// ../models/task.ts
import { db } from "../config/db/db";

export const createTask = async (
  titulo: string,
  descripcion: string,
  fecha: string
) => {
  // Insertar una nueva tarea en la base de datos
  await db.run(
    "INSERT INTO tareas (titulo, descripcion, estado, fecha) VALUES (?, ?, ?, ?)",
    [titulo, descripcion, 1, fecha]
  );
};

export const getTasks = async () => {
  // Obtener todas las tareas de la base de datos
  return await db.all(
    'SELECT id, titulo, descripcion, estado, DATE_FORMAT(fecha, "%d-%m-%Y %H:%i") as fecha FROM tareas'
  );
};

export const updateTaskStatus = async (id: string, estado: string) => {
  // Actualizar el estado de una tarea en la base de datos
  await db.run("UPDATE tareas SET estado = ? WHERE id = ?", [estado, id]);
};

export const deleteTask = async (id: string) => {
  // Eliminar una tarea de la base de datos
  await db.run("DELETE FROM tareas WHERE id = ?", [id]);
};
