import express from "express";
import fs from "fs";
import https from "https";
import { createServer } from "https";
import cors from "cors";
import jwt from 'jsonwebtoken';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';


import locks_routes from "./routes/nuki_locks.js";
import lock_assigments_routes from "./routes/lock_assigments.js";
import resources_routes from "./routes/resources.js";
import bookings_routes from "./routes/bookings.js";
import isAuthorized from "./middlewares/isAuthorized.js";



const app = express();
app.use(cookieParser());

dotenv.config();


const corsConfig = {
    credentials: true,
    origin: true
  };
  app.use(cors(corsConfig));
  
  app.use(express.json());
  
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true
    })
  );
  
  app.use(bodyParser.json());
  
  app.use(express.static("public"));
  
  app.get("/", (req, res) => {
    res.send("ZASTODAY ADMIN Backend API");
  });
  
  
  https
    .createServer(
      {
        key: fs.readFileSync(process.env.SSL_PATH + "privkey.pem"),
        cert: fs.readFileSync(process.env.SSL_PATH + "cert.pem"),
        ca: fs.readFileSync(process.env.SSL_PATH + "chain.pem"),
        requestCert: false,
        rejectUnauthorized: false
      },
      app
    )
    .listen(process.env.API_PORT, function() {
      console.log(
        "ZASTODAY - ADMIN Backend API listening on port " + process.env.API_PORT
      );
      
    });


    app.use("/locks",isAuthorized, locks_routes);
    app.use("/resources",isAuthorized, resources_routes);
    app.use("/assignments",isAuthorized, lock_assigments_routes);
    app.use("/bookings",isAuthorized, bookings_routes);

    


    // create a token if needed
app.get("/jwt", (req, res) => {
  let privateKey = fs.readFileSync("./ssl/private.pem", "utf8");
  let token = jwt.sign(
    {
      body: "stuff"
    },
    privateKey,
    {
      algorithm: "HS256"
    }
  );
  res.send(token);
});