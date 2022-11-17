const express = require('express');
const router  = express.Router();
const choicesQueries = require('../db/queries/choices');
const pollsQueries = require('../db/queries/polls');

router.get('/:id', (req, res) => {
  pollsQueries.getPollByLink(req.params.id)
    .then(poll => {
      choicesQueries.getChoices(req.params.id)
        .then((choices) => {
          const templateVars = {
            poll,
            choices
          };
          res.render('vote', templateVars);
        });

    });

});

module.exports = router;

