const express = require('express');
const router  = express.Router();
const { generateRandomString } = require('../public/scripts/helpers');
const pollsQueries = require('../db/queries/polls');
const choiceQueries = require('../db/queries/choices');

router.get('/', (req, res) => {
  res.render('new');
});

router.post('/', (req, res) => {
  let poll = {
    creator_email: req.body.email,
    active: true,
    title: req.body.title,
    description: req.body.description,
    voter_link: generateRandomString(10),
    admin_link: generateRandomString(10)
  };
  let choices = [
    req.body.choice_one,
    req.body.choice_two,
    req.body.choice_three,
    req.body.choice_four,
    req.body.choice_five
  ];
  return pollsQueries.addPoll(poll)
    .then(async(dbPoll) => {
      poll.id = dbPoll.id;
      for (let i of choices) {
        if (i) {
          await choiceQueries.addChoice({
            poll_id: dbPoll.id,
            value: i
          })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        }
      }
    })
    .then(()=> {
      res.redirect(`/admin/${poll.admin_link}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

}



);

module.exports = router;
