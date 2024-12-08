import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Loan Application API",
      version: "1.0.0",
    },
  },
  apis: [
    "./src/api/*Schemas.ts",
    "./src/api/*Routes.ts",
    "./src/service/*Types.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export { setupSwagger };
