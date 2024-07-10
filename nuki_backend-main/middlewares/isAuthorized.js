import fs from 'fs';
import jwt from 'jsonwebtoken';

export default function isAuthorized(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization.split(" ")[1];
      let privateKey = fs.readFileSync('./ssl/private.pem', 'utf8');
      jwt.verify(token, privateKey, {
        algorithm: "HS256"
      }, (err, user) => {
        if (err) {
          
          res.status(500).json({
            error: "Not Authorized"
          });

          console.log("token 1")
        }
        return next();
      });
    } else {

      console.log("token 2")

      res.status(500).json({
        error: "Not Authorized"
      });
    }
  }