// ติดต่อกับฐานข้อมูล /ดำเนินการกับฐานข้อมูล
const slugify = require("slugify");
const Blogs = require("../Models/blog.js");
const { v4: uuidv4 } = require("uuid");
// บันทึกข้อมูล
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) slug = uuidv4();
  // validate / ตรวจความถูกต้องของข้อมูล
  switch (true) {
    case !title:
      return res.status(400).json({
        error: "กรุณาป้อนชื่อบทความ",
      });
      break;
    case !content:
      return res.status(400).json({
        error: "กรุณาป้อนเนื้อหาบทความ",
      });
      break;
  }
  // บึนทึกข้อมูล
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      res.status(400).json({
        error: "มีชื่อบทความซ้ำกัน",
      });
    }
    res.json(blog);
  });
};
// ดึงข้อมูลทั้งหมด
exports.getAllblogs = (req, res) => {
  Blogs.find({}).exec((err, blogs) => {
    res.json(blogs);
  });
};

// ดึงบทความที่สนใจอ้างอิงตาม slug
exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).exec((err, blog) => {
    res.json(blog);
  });
};

// ลบข้อมูล
exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.json({
      message: "ลบข้อมูลเรียบร้อย",
    });
  });
};

// update ข้อมูล
exports.update = (req, res) => {
  const { slug } = req.params;
  // ส่งข้อมูล => title, content, author
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  ).exec((err, blog) => {
    if (err) console.log(err);
    res.json(blog);
  });
};
