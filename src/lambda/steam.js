const axios = require("axios");

exports.handler = ({ queryStringParameters }, ctx, cb) => {
  const url = `https://steamcommunity.com/inventory/${queryStringParameters.id}/730/2?l=english&count=5000`;

  axios
    .get(url)
    .then(res => {
      console.log(res.data);

      cb(null, { statusCode: 200, body: res.data });
    })
    .catch(err => cb(err));
};
