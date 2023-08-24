# Proyecto de Prueba en TypeScript

Este es un proyecto de prueba en TypeScript que incluye un servidor y un cliente. Sigue los pasos a continuación para realizar una prueba de la aplicación, incluso si no tienes conocimientos de programación.

Requisitos previos:
- XAMPP Server: Descarga XAMPP Server desde el siguiente enlace: [link](https://www.apachefriends.org/download.html). Después de descargarlo, abre el panel de control de XAMPP y ejecuta los servicios de Apache y MySQL.
- Abre el gestor de  db phpmyadmin  con el link: [link](http://localhost/phpmyadmin). para acceder a la base de datos  con el user: root  sin colocar contraseña.
- importa la base de datos desde el panel  superior donde dide importar.
- Node.js: Descarga Node.js desde el siguiente enlace: [link](https://nodejs.org/en/download/). Selecciona la versión adecuada para tu sistema operativo y procede a la instalación.

Pasos:
1. Clonar el repositorio:
   - Abre una terminal o línea de comandos en tu sistema.
   - Ejecuta el siguiente comando: `git clone https://github.com/davidduque1992/taskmanager.git`

2. Configurar y ejecutar el servidor:
   - En la terminal, navega al directorio "back" dentro del repositorio clonado.
   - Instala las dependencias del servidor ejecutando el siguiente comando: `npm install`
   - Una vez finalizada la instalación, ejecuta el servidor con el comando: `ts-node server.ts`
   - Deberías ver el mensaje: "Cargando la ruta... task" y "Api corriendo por el puerto 3000"

3. Configurar y ejecutar el cliente:
   - En la terminal, navega al directorio "front" dentro del repositorio clonado.
   - Instala las dependencias del cliente ejecutando el siguiente comando: `npm install`
   - Espera a que finalice la instalación.
   - Ejecuta el cliente con el comando: `npm run dev`
   - Verás un mensaje similar a: 
     ```
     > tupaca@0.0.0 dev
     > vite

     VITE v4.4.4 ready in 1534 ms

     ➜ Local: http://localhost:5173/
     ➜ Network: http://192.168.56.1:5173/
     ➜ Network: http://192.168.1.4:5173/
     ```
4. Prueba la aplicación:
   - Copia una de las URLs que aparecen en la salida de la terminal en tu navegador.
   - Comienza a explorar y probar la aplicación.
