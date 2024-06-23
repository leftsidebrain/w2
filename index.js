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
  const query = `SELECT * FROM "tb_blogs" ORDER BY id DESC`;
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  res.render("index", { obj });
  console.log("🚀 ~ home ~ obj:", obj);
}
app.get("/blog", blog);
async function blog(req, res) {
  const query = "SELECT * FROM tb_blogs ORDER BY ID DESC";
  const obj = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  console.log("🚀 ~ blog ~ obj:", obj);

  res.render("blog", { data: obj });
}
app.get("/add-blog", viewblog);
function viewblog(req, res) {
  res.render("add-blog");
}

// meminta data inputan dari add-blog
app.post("/add-blog", addContent);
async function addContent(req, res) {
  const { title, start, end, content, node, react, next, typescript, image } = req.body;

  const v1 = node == "on" ? true : false;
  const v2 = react == "on" ? true : false;
  const v3 = next == "on" ? true : false;
  const v4 = typescript == "on" ? true : false;

  const awal = new Date(start).getTime();
  const akhir = new Date(end).getTime();

  const Durasi = hitungDurasi(akhir, awal);

  const query = `INSERT INTO "tb_blogs"(title,start_date,end_date,content,nodejs,reactjs,nextjs,typescript,image,durasi, "createdAt", "updatedAt") VALUES ('${title}', '${start}', '${end}', '${content}','${v1}','${v2}', '${v3}', '${v4}', '${image}', '${Durasi}',NOW(),NOW())`;
  await sequelize.query(query, { type: QueryTypes.INSERT });
  res.redirect("/blog");
}

function hitungDurasi(end, start) {
  let difference = end - start;
  let daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

  return `${daysDifference} hari`;
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
  const { id, title, content, end, start, node, react, next, typescript, image } = req.body;
  const v1 = node == "on" ? true : false;
  const v2 = react == "on" ? true : false;
  const v3 = next == "on" ? true : false;
  const v4 = typescript == "on" ? true : false;

  const awal = new Date(start).getTime();
  const akhir = new Date(end).getTime();

  const Durasi = hitungDurasi(akhir, awal);

  const query = `UPDATE "tb_blogs" SET title='${title}',start_date='${start}',end_date='${end}',content='${content}',nodejs='${v1}',reactjs='${v2}',nextjs='${v3}',typescript='${v4}',image='${image}',durasi='${Durasi}',"createdAt"=NOW(),"updatedAt"=NOW() WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/blog");
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
