const option_algo = {1:'linear', 2:'multiple'} //range of option_algo_selector;
let poll_id; // when create a new poll , should return a poll_id;

class poll{
  constructor(email,title,option_weight,option_algo_selector){
    this.owner = email;
    this.title = title;
    this.options = [];
    this.option_algo = option_algo_selector;
    this.isActive = false;
    this.id = null;

  };

  addOption(option){
    this.options.push(option);
  };


  enable(flag){
    this.isActive = True;
  };


  disable(flag){
    this.isActive = False;
  };

  submitPoll(this){
    /*
    send to database
    coding....
    */
    this.id =   //should get from return ;
    this.enable(); //set to active?
  };

  get poll_result() {

    // if(this.option_algo.id = 2){
    // return pool
    // .query(
    // `
    //  SELECT option_id, sum(power(2,(6-ranking)) as score FROM vote WHERE poll_id = $1 group by option_id order by sum(ranking);
    // `,
    // [this.id]
    // ).then((res) => {
    // if (res.rows.length) {
    //   return res.rows;
    // } else {
    //   return null;
    // }
    // })
    // }

  //  else {
    return pool
    .query(
    `
     SELECT option_id, sum(6-ranking) as score FROM vote WHERE poll_id = $1 group by option_id order by sum(ranking);
    `,
    [this.id]
   )
  .then((res) => {
    if (res.rows.length) {
      return res.rows;
    } else {
      return null;
    }
   }
   )
  };
}

const getPollResult= function(poll_id) {
  return pool
    .query(
      `
    SELECT * FROM vote WHERE poll_id = $1;
    `,
      [poll_id]
    )
    .then((res) => {
      if (res.rows.length) {
        return res.rows;
      } else {
        return null;
      }
    });
};




