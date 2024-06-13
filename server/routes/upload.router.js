const express = require('express');
const pool = require('../modules/pool');
//const pool = require('../modules/pool');
const router = express.Router();
//const path = require('path');
//const multer = require('multer');

module.exports = (upload) => {

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "EditTree.jsx"));
// });

router.post('/single', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('Single File Upload Success');
});

router.post('/multiple', upload.array('images', 3), (req, res) => {
  console.log(req.files);
  res.send('Multiple Files Upload Success');
});

router.get('/', (req, res) => {
  const query = `
  SELECT * FROM "images"
  ORDER BY "image_data";
  `;
  pool
  .query(query)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error: GET all Images', error);
    res.sendStatus(500);
  });
});

return router;

};
// router.post('/upload', upload.single('file'), (req, res) => {
//   console.log('Multer upload Post', req.body);

//   const insertAddImageQuery = `
//   INSERT INTO "trees"
//   ("images")
//   VALUES
//   ($1)
//   RETURNING "id";
//   `;
//   const insertAddImageValues = [
//     req.body.images,
//   ];

//   pool.query(insertAddImageQuery, insertAddImageValues)
//   .then((result) => {
//     console.log()
//   })
// })
