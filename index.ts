import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as path from "path";
import methodOverrite from "method-override";
import * as database from "./config/database";
import clientRoutes from "./routers/client/index.route";
import adminRoutes from "./routers/admin/index.route";
import { systemConfig } from "./config/config";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string  = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverrite("_method"));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//TinyMCE Configuration
app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Client Routes
clientRoutes(app);

// Admin Routes
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
