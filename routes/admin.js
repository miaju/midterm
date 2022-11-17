const express = require('express');
const router  = express.Router();
const pollsQueries = require('../db/queries/polls');
const choiceQueries = require('../db/queries/choices');

router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/:id',(req,res)=>{
  const link = req.params.id.split(':')[1];
  console.log(link);
  pollsQueries.getPollByLink(link)
  .then((result)=>{
    if(result){
      if (link == result.voter_link){
        res.redirect(`/vote/:${link}`);
      }
      else if(link != result.admin_link){
        const msg = "The link provide is not valid!";
        res.render("/msg",{msg});
      }
      else {
        const root = "localhost:8080/";
        const pollid = result.id;
        const title = result.
        choiceQueries.getChoicesandscore(pollid)
        .then((result)=>{
          /*
          result output like below:
          [
              { choice_id: 4, value: 'sushi', score: '16' },
              { choice_id: 5, value: 'ramen', score: '13' },
              { choice_id: 6, value: 'sashimi', score: '11' }
           ]
          */
          const templateVars = {
            admin_link:root.concat('admin/:',poll.admin_link),
            voter_link:root.concat('voter/:',poll.voter_link),
            choicesandscore:result
          };
          res.render(`/:${link}`,templateVars);
        })
      }}
  });
});


module.exports = router;
