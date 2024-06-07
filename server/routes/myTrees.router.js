const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `
  SELECT * FROM "trees" 
  ORDER BY "name";
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error: GET all trees', error);
      res.sendStatus(500);
    });
});

router.get('/:id', async (req, res) => {
  const query = `SELECT * FROM trees WHERE "id"=$1;`;

  pool
    .query(query, [req.params.id])
    .then((results) => {
      res.send(results.rows[0]);
    })
    .catch((error) => {
      console.log('ERROR: GET tree by :id', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log(req.body);

  const insertAddTreeQuery = `
  INSERT INTO "trees"
  ("name", "dob", "images")
  VALUES
  ($1, $2, $3)
  RETURNING "id";
  `;
  const insertAddTreeValues = [req.body.name, req.body.dob, req.body.images];
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

module.exports = router;

router.put('/:id', (req, res) => {
  const queryText = `UPDATE "trees" SET "name" = $1, "dob" = $2, "images" = $3
  WHERE "id" = $4, "user_id" = $5;
  `;
  pool
    .query(queryText, [
      req.body.name,
      req.body.dob,
      req.body.images,
      req.params.id,
    ])
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
