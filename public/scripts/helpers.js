
//generates a random string made of lower or uppercase letters or digits 0-9 of given length
const generateRandomString = function(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor((chars.length * Math.random()))];
  }

  return result;
};

module.exports = {
  generateRandomString,
};
