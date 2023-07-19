// ../services/task.ts
import * as taskModel from "../models/task";

export const createTask = async (
    titulo: string,
  descripcion: string,
  fecha: string
) => {
  // Llamar a la función del modelo para crear una nueva tarea
  await taskModel.createTask(titulo, descripcion, fecha);

  // Devolver el resultado de la operación
  return { estado: true, mensaje: "Tarea creada" };
};

export const getTasks = async () => {
  // Llamar a la función del modelo para obtener todas las tareas
  const tareas = await taskModel.getTasks();

  // Devolver el resultado de la operación
  return { estado: true, tareas };
};

export const updateTaskStatus = async (id: string, estado: string) => {
  // Llamar a la función del modelo para actualizar el estado de una tarea
  await taskModel.updateTaskStatus(id, estado);

  // Devolver el resultado de la operación
  return { estado: true, mensaje: "Estado actualizado" };
};

export const deleteTask = async (id: string) => {
  // Llamar a la función del modelo para eliminar una tarea
  await taskModel.deleteTask(id);

  // Devolver el resultado de la operación
  return { estado: true, mensaje: "Tarea eliminada" };
};
