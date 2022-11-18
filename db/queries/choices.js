const db = require('../connection');
/**
 * Get a list of choices from the database given their poll id.
 * @param {Number} pollId The poll id.
 * @return {Promise<{}>} A promise to the user.
 */
const getChoices = function(pollId) {
  return db.query(`
  SELECT * FROM choices
  WHERE poll_id = ${pollId};
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

const getChoicesandscore = function(pollId) {
  return db.query(`
  SELECT choices.id AS choice_id, choices.value, sum(6 - votes.ranking) AS score
  FROM votes
  RIGHT JOIN choices on choices.id = votes.choice_id
  WHERE choices.poll_id = $1
  GROUP BY choices.id
  ORDER BY score DESC;
  `, [pollId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addChoice = function(choice) {
  return db
    .query(
      `
    INSERT INTO choices (poll_id, value)
    VALUES ($1, $2)
    RETURNING *;
    `,
      [choice.poll_id, choice.value]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getChoices,
  addChoice,
  getChoicesandscore
};
