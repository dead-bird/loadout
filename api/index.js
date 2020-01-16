import getInventory from './getInventory';
import limit from 'express-rate-limit';
import dotenv from 'dotenv/config';
import express from 'express';
import axios from 'axios';
import log from './log';

const steam = axios.create({
  baseURL: 'https://api.steampowered.com/',
  method: 'get',
});

steam.interceptors.request.use(config => {
  config.params = {
    key: process.env.KEY,
    ...config.params,
  };

  return config;
});

let app = express();

// Set Express headers
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');

  // Set which HTTP headers can be used the request
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, Accept'
  );

  // Only allow GET requests
  res.header('Access-Control-Allow-Methods', 'GET');

  // Onwards!
  next();
});

// We're proxying apache to localhost so we wanna grab the client’s IP
// address from the X-Forwarded-* header for correct IP rate limitting
// app.set('trust proxy', 1);

// Rate limit per IP address
app.use(
  limit({
    message: { status: 429, message: 'alright there cowboy, time to stop 🤠' },
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.get('/user/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const inventory = await getInventory(steam, id);
    const { data } = await steam('ISteamUser/GetPlayerSummaries/v0002/', {
      params: { steamids: id },
    });

    // return res.json({ status: 200, items: test.data.result.items });

    const user = data.response.players[0] || null;

    return res.json(
      user
        ? { status: 200, user, inventory }
        : { status: 404, msg: 'User not found' }
    );
  } catch (e) {
    const err = e.response || null;

    if (err) {
      return res.json({ status: err.status, msg: err.statusText });
    }

    log.error(e);

    return res.json({ status: 500, msg: 'An error occured' });
  }
});

// Listen for connections
app.listen(3002, () => log.info(`peep me at http://localhost:3002/`));
