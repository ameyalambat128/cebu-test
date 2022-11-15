import express, { Request, Response, NextFunction } from "express";

const reqLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();
  res.on("finish", () => {
    const elapsed = new Date().getTime() - start;
    console.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`
    );
  });
  next();
};

export { reqLoggerMiddleware };
