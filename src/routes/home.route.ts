import express, { Router, Request, Response } from "express";

const homeRouter: Router = express.Router();

homeRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to Cebu API");
});

export { homeRouter };
