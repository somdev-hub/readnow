const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
// const methodOverride = require("method-override");

const promise = MongoClient.connect(process.env.MONGO_URI).then((client) =>
  client.db(process.env.DATABASE)
);

const storage = new GridFsStorage({
  // url: process.env.MONGO_URI,
  db: promise,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log(file);
    const match = ["image/png", "image/jpeg", "image/jpg"];
    // console.log(file);
    if (match.indexOf(file.mimetype) === -1) {
      return {
        bucketName: "files",
        filename: `${Date.now()}-posts-${file.originalname}`
      };
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-posts-${file.originalname}`
    };
    // return new Promise((resolve, reject) => {
    //   const filename = `${Date.now()}-posts-${file.originalname}`;
    //   const fileInfo = {
    //     filename,
    //     bucketName: "photos"
    //   };
    //   resolve(fileInfo);
    // });
  }
});

// const upload = multer({ storage });

// module.exports = upload;
module.exports = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
  // { name: "coverLetter", maxCount: 1 },
]);

