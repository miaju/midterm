const express = require('express');
const router  = express.Router();
const choicesQueries = require('../db/queries/choices');
const pollsQueries = require('../db/queries/polls');

router.get('/:id', (req, res) => {
  pollsQueries.getPollByLink(req.params.id)
    .then(poll => {
      choicesQueries.getChoices(poll.id)
        .then((choices) => {
          const templateVars = {
            post_link: `/vote/${poll.voter_link}`,
            poll,
            choices
          };
          console.log(templateVars);
          res.render('vote', templateVars);
        });

    });

});

router.post('/:id', (req, res) => {
  console.log(req.body);
  res.redirect(`/`);
});

module.exports = router;

