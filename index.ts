import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as path from "path";
import * as database from "./config/database";
import clientRoutes from "./routers/client/index.route";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string  = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Client Routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
