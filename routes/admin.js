const express = require('express');
const router  = express.Router();
const pollsQueries = require('../db/queries/polls');
const choiceQueries = require('../db/queries/choices');


router.get('/:id', (req, res) => {
  pollsQueries.getPollByLink(req.params.id)
    .then((poll) => {
      const root = "localhost:8080/";
      const pollId = poll.id;
      choiceQueries.getChoicesandscore(pollId)
        .then((choices) => {
          console.log(`choices: ${choices}`);
          const templateVars = {
            admin_link: root.concat('admin/:', poll.admin_link),
            voter_link: root.concat('voter/:', poll.voter_link),
            poll, //have all elements of polls in the db
            choices // have choice_id, value, and score
          };
          console.log(templateVars);
          res.render('admin', templateVars);
        })
        .catch(err => {
          res.render('msg', {msg: err.message});
        });
    })
    .catch(err => {
      res.render('msg', {msg: err.message});
    });
});


module.exports = router;
