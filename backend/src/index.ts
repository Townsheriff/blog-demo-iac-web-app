import express from "express";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World From Backend");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
