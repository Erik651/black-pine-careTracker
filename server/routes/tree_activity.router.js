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
      console.log(query)
    })
    .catch((error) => {
      console.log('Error: GET all status', error);
      res.sendStatus(500);
    });
});


router.put('/:id', (req, res) => {
  const queryText = `UPDATE "tree_activity"
  SET
      "tree_id" = $1,
      "date_text" = $2,
      "activity_id" = $3
  WHERE
      "id" = $4 and "user_id" = $5;
      `;

      const queryValues = [
        req.body.tree_id,
        req.body.date_text,
        req.body.activity_id,
        req.params.id,
        req.user.id,
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
