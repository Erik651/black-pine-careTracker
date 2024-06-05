const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
  console.log(req.body);

  const insertAddTreeQuery = 
  `
  INSERT INTO "trees"
  ("name", "dob", "images")
  VALUES
  ($1, $2, $3)
  RETURNING "id";
  `;
  const insertAddTreeValues = [
    req.body.name,
    req.body.dob,
    req.body.images,
  ];
  pool
  .query(insertAddTreeQuery, insertAddTreeValues)
  .then((result) => {
    console.log('New Tree ID:', result.rows[0].id);
    //const createdAddedTreeId = results.rows[0].id;
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

export default router;