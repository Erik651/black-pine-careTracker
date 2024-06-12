// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();


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