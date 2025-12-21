const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>you app is up and running<h1/>`);
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
