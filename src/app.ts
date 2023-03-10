import express, { Express } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
// import mongoose from "mongoose";
import "./database";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import privateIndex from "./routes/private.routes";
import publicIndex from "./routes/public.routes";
// -----------------------auth0---------------------------------------------------------
import { auth } from "express-oauth2-jwt-bearer";
// -----------------------auth0---------------------------------------------------------

export const app: Express = express();

let port: string;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT;
} else {
  port = "8800";
}

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: process.env.URL,
    }),
  );
}
export const httpServer = createServer(app);

import "./config/socket.io.config/";

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
let checkJwt:express.Handler;


checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNING_ALG,
});

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
  // console.log(process.env.NODE_ENV);
} else if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);
}

app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images")),
);
app.use(
  "/audios",
  express.static(path.join(__dirname, "../public/audios")),
);
app.use(
  "/videos",
  express.static(path.join(__dirname, "../public/videos")),
);

app.use("/api/private/", checkJwt, privateIndex);
app.use("/api/public/", publicIndex);

httpServer.listen(port);
// app.listen(port);
