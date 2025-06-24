import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Funcionando!",
    version: "1.0.0",
  });
});

export default app;
