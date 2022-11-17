const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/:id',(req,res)=>{

  console.log("ddddddd");
  console.log(req.params);


});



module.exports = router;
