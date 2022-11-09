const db = require('../connection');

const getVotes = function(pollId) {
  return db.query(`
  SELECT * FROM votes
  WHERE poll_id = ${pollId};
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getVotes };
