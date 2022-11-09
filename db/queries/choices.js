const db = require('../connection');

const getChoices = function(pollId) {
  return db.query(`
  SELECT * FROM choices
  WHERE poll_id = ${pollId};
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getChoices };
