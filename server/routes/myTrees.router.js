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

router.get('/:id', (req, res) => {
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
  ("name", "dob", "images", "notes")
  VALUES
  ($1, $2, $3, $4)
  RETURNING "id";
  `;
  const insertAddTreeValues = [
    req.body.name,
    req.body.dob,
    req.body.images,
    req.body.notes,
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

router.put('/:id', (req, res) => {
  const queryText = `UPDATE "trees"
  SET "name" = $1, "dob" = $2, "images" = $3, "notes" = $6
  WHERE "id" = $4 AND "user_id" = $5;
  `;

  const queryValues = [
    req.body.name,
    req.body.dob,
    req.body.images,
    req.params.id,
    req.user.id,
    req.body.notes,
  ];

  console.log('Executing query:', queryText);
  console.log('With values:', queryValues);

  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error executing query:', error.message);
      console.log('ERROR details:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
