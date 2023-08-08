const express = require("express");
const port = 3000;
const path = require("path");
const app = express();

const multer = require("multer");


const ejs = require("ejs");
app.set("view engine", "ejs");

app.set("views", path.resolve("./view"));
//code for urlencoded
app.use(express.urlencoded({ extended: false }));
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./aman")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'application/pdf' ) {
      // Accept only JPG files
      cb(null, true);
    } else {
      // Reject other file types
      cb(new Error('Only pdf file is allowesd'));
    }
  };



const upload=multer({storage, fileFilter: fileFilter})

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});
app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
