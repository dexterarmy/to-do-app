const express = require("express");
const Todo = require("./models/todoModel");

const app = express();

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// GET
app.get("/", async (req, res) => {
  try {
    const tasks = await Todo.find();

    res.render("todo.ejs", { todoTasks: tasks });
  } catch (err) {
    res.redirect("/");
  }
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

//UPDATE
app
  .route("/edit/:id")
  .get(async (req, res) => {
    const id = req.params.id;

    const tasks = await Todo.find();
    res.render("todoEdit.ejs", { todoTasks: tasks, idTasks: id });
  })
  .post(async (req, res) => {
    try {
      const id = req.params.id;

      const task = await Todo.findByIdAndUpdate(id, { content: req.body.content });
      res.redirect("/");
    } catch (err) {
      res.status(500).send(err);
    }
  });

// DELETE
app.route("/remove/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
