const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // GET route code here
  const query = `
  SELECT * FROM "tree_activity" 
  ORDER BY "date_text";
  `;
  pool
    .query(query)
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

  const queryValues = [req.body.date_text, req.body.treeId, req.body.activity_id];

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
