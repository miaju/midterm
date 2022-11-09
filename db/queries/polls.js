const db = require('../connection');

/**
 * Get polls from the database..
 * @return {Promise<{}>} A promise to the user.
 */
const getPolls = () => {
  return db.query('SELECT * FROM polls;')
    .then(data => {
      return data.rows;
    });
};

/**
 * Add a new poll to the database.
 * @param {{}} poll
 * @return {Promise<{}>} A promise to the user.
 */
const addPoll = function(poll) {
  return pool
    .query(
      `
    INSERT INTO polls (creator_email, active, title, description, voter_link, admin_link)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
      [poll.creator_email, poll.active, poll.title, poll.description, poll.voter_link, poll.admin_link]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getPolls,
  addPoll,
};
