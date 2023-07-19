// db.ts
import mysql from "mysql2/promise";

// Crear una conexión a la base de datos
const connect = async () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tupacatask"
  });
};

// Exportar un objeto con métodos para interactuar con la base de datos
export const db = {
  run: async (query: string, params: any[] = []) => {
    const connection = await connect();
    await connection.execute(query, params);
    connection.end();
  },
  all: async (query: string, params: any[] = []) => {
    const connection = await connect();
    const [rows] = await connection.execute(query, params);
    connection.end();
    return rows;
  }
};
