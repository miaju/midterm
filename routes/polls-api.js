/*
 * All routes for Polls Data are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /api/polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const pollsQueries = require('../db/queries/polls');

router.get('/', (req, res) => {
  pollsQueries.getPolls()
    .then(polls => {
      res.json({ polls });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
