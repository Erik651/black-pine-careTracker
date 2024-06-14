const express = require('express');
const pool = require('../modules/pool');
//const pool = require('../modules/pool');
const router = express.Router();
const fs = require('fs'); 
//const path = require('path');
//const multer = require('multer');



  module.exports = (upload) => {
    router.post('/single', upload.single('image'), (req, res) => {
      const { filename, mimetype, path: filepath } = req.file;
      const tree_id = req.body.tree_id; // Assuming tree_id is sent in the request body
  
      fs.readFile(filepath, (err, data) => {
        if (err) {
          console.error('Error reading file', err);
          return res.sendStatus(500);
        }
        const query = `
          INSERT INTO "images" (image_data, filename, mimetype, tree_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
        const values = [data, filename, mimetype, tree_id];
        pool
          .query(query, values)
          .then((result) => {
            console.log(result.rows[0]);
            res.send('Single File Upload Success');
          })
          .catch((error) => {
            console.log('Error: INSERT single image', error);
            res.sendStatus(500);
          });
      });
    });
  
    router.post('/multiple', upload.array('images', 3), (req, res) => {
      const files = req.files;
      const tree_id = req.body.tree_id; // Assuming tree_id is sent in the request body
      const query = `
        INSERT INTO "images" (image_data, filename, mimetype, tree_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const promises = files.map((file) => {
        const { filename, mimetype, path: filepath } = file;
        return new Promise((resolve, reject) => {
          fs.readFile(filepath, (err, data) => {
            if (err) {
              reject(err);
            }
            const values = [data, filename, mimetype, tree_id];
            pool.query(query, values)
              .then((result) => resolve(result))
              .catch((error) => reject(error));
          });
        });
      });
  
      Promise.all(promises)
        .then((results) => {
          results.forEach(result => console.log(result.rows[0]));
          res.send('Multiple Files Upload Success');
        })
        .catch((error) => {
          console.log('Error: INSERT multiple images', error);
          res.sendStatus(500);
        });
    });
  
    router.get('/:treeId', (req, res) => {
      const treeId = req.params.treeId;
      const query = `
        SELECT id, filename, mimetype, image_data, tree_id, created_at
    FROM "images"
    WHERE tree_id = $1
    ORDER BY "created_at" DESC;
      `;
      pool
        .query(query, [treeId])
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


