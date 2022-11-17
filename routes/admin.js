const express = require('express');
const router  = express.Router();
const pollsQueries = require('../db/queries/polls');
const choiceQueries = require('../db/queries/choices');
const voteQueries = require('../db/queries/votes');

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
      } else if (link == result.admin_link) {
        const root = "localhost:8080/";
        const pollid = result.id;
        choiceQueries.getChoicesidandvalue(pollid)
        .then(async(choice_result)=>{
          const choice_arr = choice_result;
          let aa=[];
          for(let i of choice_arr){
            aa.push(await voteQueries.getVotesscore(i.id));
          }
          return {choice_arr,aa};
        })
          .then((data)=>{
            //console.log("for debug use-------------",data);
            const templateVars = {
            admin_link:root.concat('admin/:',result.admin_link),
            voter_link:root.concat('voter/:',result.voter_link),
            choicesandvalue:data.choice_arr,
            score:data.aa
          };
          console.log(templateVars);
          res.render('admin',templateVars);
          }
          );
        }

    } else {
      const msg = "The link provide is not valid!";
      res.render("/msg",{msg});
    }
  })
  .catch((err) => {
    console.log(err.message);
  })
});



module.exports = router;
