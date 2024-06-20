const express = require("express");
const app = express();
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const port = 3000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));

app.get("/", home);
async function home(req, res) {
  const query = `SELECT * FROM "tb_blogs"`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  res.render("index", { obj });
  console.log("🚀 ~ home ~ obj:", obj);
}
// app.get("/blog", blog);
// async function blog(req, res) {
//   const query = "SELECT * FROM tb_blogs";
//   const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
//   console.log("🚀 ~ blog ~ obj:", obj);

//   res.render("blog", { data: obj });
// }
app.get("/add-blog", viewblog);
function viewblog(req, res) {
  res.render("add-blog");
}

// meminta data inputan dari add-blog
app.post("/add-blog", addContent);
async function addContent(req, res) {
  const { title, content } = req.body;
  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");
  const query = `INSERT INTO "tb_blogs"(title, content, "createdAt", "updatedAt") VALUES ('${title}', '${content}','${dateString}','${dateString}')`;
  await sequelize.query(query, { type: QueryTypes.INSERT });
  res.redirect("/");
}

// data blog detail

app.get("/blog-detail/:id", blogDetail);
async function blogDetail(req, res) {
  const { id } = req.params;
  // const detail = data[id];
  const query = `SELECT * FROM "tb_blogs" WHERE "id" = ${id}`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  console.log("🚀 ~ blogDetail ~ obj:", obj);

  res.render("blog-detail", { data: obj[0] });
}

// Edit blog

app.get("/edit-blog/:id", editBlog);
async function editBlog(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM "tb_blogs" WHERE "id" = ${id}`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

  res.render("edit-blog", { data: obj[0] });
}

// update data edit blog

app.post("/edit-blog", updateBlog);
async function updateBlog(req, res) {
  const { id, title, content } = req.body;
  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");
  const query = `UPDATE "tb_blogs" SET title='${title}',content='${content}',"createdAt"='${dateString}',"updatedAt"='${dateString}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/");
}

// delete blog conten

app.get("/delete/:id", deleteBlog);
async function deleteBlog(req, res) {
  const { id } = req.params;
  const query = `DELETE FROM "tb_blogs" WHERE id = ${id}`;
  await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
  res.redirect("/");
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
