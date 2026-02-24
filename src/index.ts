import express, { Request, Response } from "express";
import productRouter from "./routes/todoRoutes";
import todoRouter from "./routes/todoRoutes";
const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Product API is running" });
});

app.use("/products", todoRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});