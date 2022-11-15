const express = require('express');
const router  = express.Router();
const { generateRandomString } = require('../public/scripts/helpers');
const pollsQueries = require('../db/queries/polls');
const choiceQueries = require('../db/queries/choices');

router.get('/', (req, res) => {
  res.render('new');
});

router.post('/', (req, res) => {
  console.log(req);
  let poll = {
    creator_email: req.body.email,
    active: true,
    title: req.body.title,
    description: req.body.description,
    voter_link: generateRandomString(10),
    admin_link: generateRandomString(10)
  };
  let choices = [
    req.choice_one,
    req.choice_two,
    req.choice_three,
    req.choice_four,
    req.choice_five
  ];

  pollsQueries.addPoll(poll)
    .then((dbPoll) => {
      for (let i of choices) {
        choiceQueries.addChoice({
          poll_id: dbPoll.id,
          value: i
        })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      }
    })
    .then(()=> {
      res.redirect('/admin');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;
