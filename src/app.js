const express = require("express");
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/view");
//-
const app = express();
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);

//------
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(port, () => console.log("listening on port " + port));
