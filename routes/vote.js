const express = require('express');
const router  = express.Router();
const choicesQueries = require('../db/queries/choices');
const pollsQueries = require('../db/queries/polls');
const votesQueries = require('../db/queries/votes');
const mailNewVote = require('../public/scripts/mail').mailNewVote;

router.get('/:id', (req, res) => {
  pollsQueries.getPollByLink(req.params.id)
    .then(poll => {
      choicesQueries.getChoices(poll.id)
        .then((choices) => {
          const templateVars = {
            poll,
            choices
          };
          res.render('vote', templateVars);
        });
    })
    .catch(err => {
      res.render('msg', {msg: err.message});
    });

});


router.post('/:id', (req, res) => {
  const voter_name = req.body.voter;
  return pollsQueries.getPollByLink(req.params.id)
    .then(async(poll) => {
      for (const choice_id in req.body) {
        if (choice_id !== 'voter') {
          const vote = {
            poll_id: poll.id,
            choice_id: Number(choice_id),
            ranking: req.body[choice_id],
            voter_name
          };
          await votesQueries.addVote(vote)
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        }
      }
      let mailName = voter_name
      if (!voter_name) {
        mailName = 'Someone';
      }
      mailNewVote(poll, mailName).catch(console.error);
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;

