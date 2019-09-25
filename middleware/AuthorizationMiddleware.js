const fs = require('fs');
const jwt = require("jsonwebtoken");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const isGuestRoute = (route, method) => {
  const guestRoutes = config.guestRoutes;

  for (let i = 0; i < guestRoutes.length; i++) {
    if (route.includes(guestRoutes[i].url) && guestRoutes[i].method === method) 
      return true;
  }
  return false;
}

const middleware = (req, res, next) => {
  console.log('====================================');
  console.log("Request: ", req.method, req.url, req.headers['content-type']);
  console.log(`Route type: ${isGuestRoute(req.url, req.method) ? "Guest" : "Auth"}`);
  console.log('====================================\n');

  if (isGuestRoute(req.url, req.method)) {
    next();
  } else if (req.headers.token) {
    jwt.verify(req.headers.token, "oui", (error, decode) => {
      if (error) {
        console.log(`Token is not OK : ${error.message}`);
        res.status(403).send("Bad Token");
      } 
      if (decode) {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(403).send("Bad Token");
  }
};

module.exports = middleware;