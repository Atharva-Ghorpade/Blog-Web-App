import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs", { posts });
});

app.get("/blog/:index", (req, res) => {
  const { index } = req.params;

  if (index >= 0 && index < posts.length) {
    const post = posts[index];
    res.render("blog", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/blog/:index/editor", (req, res) => {
  const { index } = req.params;

  if (index >= 0 && index < posts.length) {
    const post = posts[index];
    res.render("editor", { post, index });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const newPost = { title, content, id: posts.length };
    posts.push(newPost);
    res.redirect("/");
  } else {
    res.redirect("/create");
  }
});

app.post("/blog/:index/editor", (req, res) => {
  const { index } = req.params;
  const { title, content } = req.body;

  if (index >= 0 && index < posts.length) {
    posts[index] = { title, content, id: parseInt(index) };
    res.redirect(`/blog/${index}`);
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/blog/:index/delete", (req, res) => {
  const { index } = req.params;

  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
    posts.forEach((post, idx) => {
      post.id = idx;
    });
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
