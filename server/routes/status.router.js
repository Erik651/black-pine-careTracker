const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  // GET route code here
  const query = `
  SELECT * FROM "status" 
  ORDER BY "status_name";
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error: GET all status', error);
      res.sendStatus(500);
    });
});

module.exports = router;