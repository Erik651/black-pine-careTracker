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
  const { name, dob, notes, status_id, user_id } = req.body;
  const queryText = `
    INSERT INTO trees (name, dob, notes, status_id, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, dob, notes, status_id, user_id;
  `;

  pool.query(queryText, [name, dob, notes, status_id, user_id])
    .then(result => {
      res.status(201).json(result.rows[0]); // Return the created tree as JSON
    })
    .catch(error => {
      console.error('Error creating new tree:', error);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const { name, dob, notes, status_id } = req.body;
  const queryText = `
    UPDATE trees
    SET name = $1, dob = $2, notes = $3, status_id = $4
    WHERE id = $5
  `;
  const queryValues = [name, dob, notes, status_id, req.params.id];
  
  pool.query(queryText, queryValues)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.error('Error updating tree:', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', async (req, res) => {
  const treeId = req.params.id;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const deleteImagesQuery = 'DELETE FROM images WHERE tree_id = $1';
    await client.query(deleteImagesQuery, [treeId]);
    
    const deleteTreeQuery = 'DELETE FROM trees WHERE id = $1';
    await client.query(deleteTreeQuery, [treeId]);

    await client.query('COMMIT');
    res.sendStatus(204);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting tree and images:', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// router.post('/', (req, res) => {
//   const { name, dob, notes, status_id, user_id } = req.body;
//   const queryText = `
//     INSERT INTO trees (name, dob, notes, status_id, user_id)
//     VALUES ($1, $2, $3)
//     RETURNING id, name, dob, notes, status_id, user_id;
//   `;

//   pool.query(queryText, [name, dob, notes, status_id, user_id])
//     .then(result => {
//       res.status(201).json(result.rows[0]); // Return the created tree as JSON
//     })
//     .catch(error => {
//       console.error('Error creating new tree:', error);
//       res.sendStatus(500);
//     });
// });

module.exports = router;

// router.post('/', (req, res) => {
//   const { name, dob, notes, status_id, user_id } = req.body;
//   const queryText = `
//     INSERT INTO trees (name, dob, notes, status_id, user_id)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING id, name, dob, notes, status_id, user_id;
//   `;

//   pool.query(queryText, [name, dob, notes, status_id, user_id])
//     .then(result => {
//       res.status(201).json(result.rows[0]); // Return the created tree as JSON
//     })
//     .catch(error => {
//       console.error('Error creating new tree:', error);
//       res.status(500).json({ error: 'Failed to create new tree' });
//     });
// });
