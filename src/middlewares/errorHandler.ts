import express from "express"

interface ErrorCode extends Error {
    statusCode?: number;
}

module.exports = (err: ErrorCode, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};
