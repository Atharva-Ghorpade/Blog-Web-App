import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs", { posts });
});

app.get("/blog/:index", (req, res) => {
  const { index } = req.params;

  if (index >= 0 && index < posts.length) {
    var post = posts[index];
    res.render("blog.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/blog/:index/editor", (req, res) => {
  const { index } = req.params;

  if (index >= 0 && index < posts.length) {
    var post = posts[index];
    res.render("editor.ejs", { post, index: index });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/create", (req, res) => {
  var btitle = req.body.title;
  var bcontent = req.body.content;
  if (btitle != "" && bcontent != "") {
    var newPost = { title: btitle, content: bcontent, id: posts.length + 1 };
    posts.push(newPost);
    res.redirect("/");
  } else {
    res.redirect("/create");
  }
});

app.post("/blog/:index/editor", (req, res) => {
  const { index } = req.params;
  console.log(req.params)
  var btitle = req.body.title;
  var bcontent = req.body.content;
  if (index >= 0 && index < posts.length) {
    var newPost = { title: btitle, content: bcontent, id: posts.length + 1 };
    posts[index] = newPost;
    res.redirect(`/blog/${index}`);
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
