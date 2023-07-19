import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const PATH_ROUTER = __dirname;

const cleanFilename = (fileName: string) => {
  const clean = fileName.split(".").shift();
  return clean;
};

(async () => {
  const files = fs.readdirSync(PATH_ROUTER);
  for (const fileName of files) {
    const prefixRoute = cleanFilename(fileName);
    if (prefixRoute !== "index") {
      console.log(`Cargando la ruta... ${prefixRoute}`);
      const route = await import(path.join(__dirname, `${prefixRoute}.ts`));
      router.use(`/${prefixRoute}`, route.default);
    }
  }
})();

export { router };
