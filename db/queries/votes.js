const db = require('../connection');
/**
 * Get a list of votes from the database given their choice id.
 * @param {Number} choiceId The choice id.
 * @return {Promise<{}>} A promise to the user.
 */
const getVotes = function(choiceId) {
  return db.query(`
  SELECT * FROM votes
  WHERE choice_id = ${choiceId};
  `)
    .then(data => {
      return data.rows;
    });
};

/**
 * Add a new poll to the database.
 * @param {{}} poll
 * @return {Promise<{}>} A promise to the user.
 */
const addVote = function(vote) {
  return db
    .query(
      `
    INSERT INTO votes (poll_id, choice_id, ranking, voter_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [vote.poll_id, vote.choice_id, vote.ranking, vote.voter_name]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);

    });
};

const getVotesscore = function(choiceId)
 {
  return db.query(`
  SELECT sum(6-ranking) as score FROM votes
  WHERE choice_id = $1 group by choice_id order by choice_id;
  `,[choiceId])
    .then(data => {
      return ((data.rows[0])?data.rows[0]:{score:0});
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {
  getVotes,
  addVote,
  getVotesscore
};
