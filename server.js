const express = require("express");
const app = express();

app.use(express.static("./dist/wmbs-project"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "dist/wmbs-project/" });
});

app.listen(process.env.PORT || 8080);
