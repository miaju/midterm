const express = require('express');
const router  = express.Router();
const pollsQueries = require('../db/queries/polls');
const choiceQueries = require('../db/queries/choices');

router.get('/:id', (req, res) => {
  pollsQueries.getPollByLink(req.params.id)
    .then(poll => {

      res.render('admin', poll);
    });

});

router.get('/:id',(req,res)=>{

  console.log("ddddddd");
  console.log(req.params);


});



module.exports = router;
