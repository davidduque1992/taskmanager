// ../controller/task.ts
import { Request, Response } from "express";
import * as taskService from "../services/task";
import { validateVariables } from "../middleware/variables";

export const createTask = [
  // Validar que se hayan recibido las variables 'title', 'description' y 'fecha'
  validateVariables(["titulo", "descripcion", "fecha"]),

  async (req: Request, res: Response) => {
    // Extraer el título, la descripción y la fecha de la tarea del cuerpo de la solicitud
    const { titulo, descripcion, fecha } = req.body;

    // Llamar a la función del servicio para crear una nueva tarea
    const result = await taskService.createTask(titulo, descripcion, fecha);

    // Devolver una respuesta al cliente
    res.json(result);
  }
];

export const getTasks = async (req: Request, res: Response) => {
  // Llamar a la función del servicio para obtener todas las tareas
  const result = await taskService.getTasks();

  // Devolver una respuesta al cliente
  res.json(result);
};

export const updateTaskStatus = [
  // Validar que se haya recibido la variable 'estado'
  validateVariables(["estado"]),

  async (req: Request, res: Response) => {
    // Obtener el ID de la tarea y el nuevo estado del cuerpo de la solicitud
    const { id } = req.params;
    const { estado } = req.body;

    // Llamar a la función del servicio para actualizar el estado de una tarea
    const result = await taskService.updateTaskStatus(id, estado);

    // Devolver una respuesta al cliente
    res.json(result);
  }
];

export const deleteTask = async (req: Request, res: Response) => {
  // Obtener el ID de la tarea del parámetro URL
  const { id } = req.params;

  // Llamar a la función del servicio para eliminar una tarea
  const result = await taskService.deleteTask(id);

  // Devolver una respuesta al cliente
  res.json(result);
};
