const express = require("express");
const Todo = require("./models/todoModel");

const app = express();

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// GET
app.get("/", (req, res) => {
  res.render("todo.ejs");
});

//POST
app.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    await Todo.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err.name, err.message);
    res.redirect("/");
  }
});

module.exports = app;
