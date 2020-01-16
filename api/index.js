import limit from 'express-rate-limit';
import dotenv from 'dotenv/config';
import express from 'express';
import log from './log';

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

// Make some tears
app.get('/user/:id', (req, res) => {
  // const api = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.KEY}&steamids=${req.params.id}`;

  return res.json({
    status: 200,
    message: 'hola',
  });
});

// Listen for connections
app.listen(3002, () => log.info(`peep me at http://localhost:3002/`));
