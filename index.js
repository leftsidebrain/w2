const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));

const data = [];

app.get("/", home);
function home(req, res) {
  res.render("index");
}
app.get("/blog", blog);
function blog(req, res) {
  res.render("blog", { data });
}
app.get("/add-blog", viewblog);
function viewblog(req, res) {
  res.render("add-blog");
}

// meminta data inputan dari add-blog
app.post("/add-blog", addContent);
function addContent(req, res) {
  const { title, content } = req.body;
  console.log("🚀 ~ addContent ~ content:", content);
  console.log("🚀 ~ addContent ~ title:", title);
  const dataBlog = { title, content };
  data.unshift(dataBlog);
  res.redirect("/blog");
}

// data blog detail

app.get("/blog-detail/:id", blogDetail);
function blogDetail(req, res) {
  const { id } = req.params;
  const detail = data[id];
  res.render("blog-detail", { detail });
}

app.get("/contact", contact);
function contact(req, res) {
  res.render("contact");
}
app.get("/testimonial", testimonial);
function testimonial(req, res) {
  res.render("testimonial");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
