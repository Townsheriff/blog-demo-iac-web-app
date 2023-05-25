import express from "express";

export const createApp = () => {
  const app = express();

  app.get("/*", function (req, res) {
    res.send(`Hello World From Backend ${req.path}`);
  });

  return app;
};
