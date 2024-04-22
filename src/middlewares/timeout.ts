import express from "express"

module.exports = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.setTimeout(10000, () => {
    res.status(504).json({ error: "Request timed out" });
  });
  
  next();
};
