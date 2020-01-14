const axios = require("axios");

exports.handler = ({ queryStringParameters }, ctx, cb) => {
  const url = `https://steamcommunity.com/inventory/${queryStringParameters.id}/730/2?l=english&count=5000`;

  axios
    .get(url)
    .then(({ body: data }) => cb(null, { statusCode: 200, body }))
    .catch(err => cb(err));
};
