const express = require('express');
const router  = express.Router();

const pollsQueries = require('../db/queries/polls');
const choiceQueries = require('../db/queries/choices');

router.get('/:id', (req, res) => {
  pollsQueries.getPollByLink(req.params.id)
    .then(poll => {

      res.render('vote', poll);
    });

});

module.exports = router;
