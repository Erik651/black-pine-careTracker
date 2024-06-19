const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  // GET route code here
  const query = `
  SELECT * FROM "tree_activity"
  WHERE "tree_id" = $1
  ORDER BY "date_text";
  `;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
      console.log(query);
    })
    .catch((error) => {
      console.log('Error: GET all status', error);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const queryText = `UPDATE "tree_activity"
  SET
      
      "date_text" = $1
      
  WHERE
  "tree_id" = $2 AND "activity_id" = $3
      `;

  const queryValues = [
    req.body.date_text,
    req.body.treeId,
    req.body.activity_id,
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

// router.post('/', (req, res) => {
//   const client = await pool.connect();
//   const { treeId, activity_id, date_text } = req.body; // Expect initialDates to be an array of { activity_id, date_text }

//   try {
//     await client.query('BEGIN');

//     const insertActivityQuery = `
//       INSERT INTO "tree_activity" ("tree_id", "activity_id", "date_text")
//       VALUES ($1, $2, $3);
//     `;

//     for (let activity of initialDates) {
//       await client.query(insertActivityQuery, [treeId, activity.activity_id, activity.date_text]);
//     }

//     await client.query('COMMIT');
//     res.sendStatus(201);
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.log('Error in POST route:', error.message);
//     res.sendStatus(500);
//   } finally {
//     client.release();
//   }
// });

router.post('/:id', (req, res) => {
  const { activity_id, date_text } = req.body;
  const treeId = req.params.id;
  const queryText = `
    INSERT INTO "tree_activity" ("tree_id", "activity_id", "date_text")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  pool
    .query(queryText, [treeId, activity_id, date_text])
    .then((result) => {
      res.status(201).json(result.rows[0]); // Return the created tree as JSON
    })
    .catch((error) => {
      console.error('Error post tree_activity:', error);
      res.sendStatus(500);
    });
});

// add Post route for add new tree and set initial care dates

module.exports = router;
