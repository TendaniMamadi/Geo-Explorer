//import all the dependencies
import pgPromise from "pg-promise";
import express from "express";
import exphbs from "express-handlebars";
import "dotenv/config";
import bodyParser from "body-parser";

import displayData from "./render.js";

import GeoExplorerServices from "./services/db_queries.js"
import GeoExplorerAPIRoutes from "./routes/geo-explorer-api-routes.js";

const dataset = displayData();

const pgp = pgPromise();

const connectionOptions = {
  connectionString: process.env.DATABASE_URL
};

const db = pgp(connectionOptions);

//setting up the Express application with Handlebars as the view engine. Handlebars templates are expected to be located in the views directory, and i've also configured partialsDir and layoutsDir.
const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});

const app = express();

const geoExplorerServices = GeoExplorerServices(db)
const geoExplorerAPIRoutes = GeoExplorerAPIRoutes(geoExplorerServices)

//Setting Up Handlebars as the View Engine:
app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

//Configuring the Views Directory:
app.set("views", "./views");

//Serving Static Files:
app.use(express.static("public"));

//first line is for parsing URL-encoded form data, and the second line is for parsing JSON data. The extended: true option allows for parsing nested objects.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3030;

app.use(express.json());



app.get("/", async function (req, res) {
  res.render("homepage");
});

app.get("/quiz/:country", dataset.getQuestions)

app.post("/quiz/:country", geoExplorerAPIRoutes.submitAnswers)

app.get("/visualModel",async function (req,res){
  res.render("visualModel")
});

app.get("/moreInfo", dataset.getMoreInfo)

app.get("/phrase",async function (req,res){
  res.render("phrase")
});

app.get("/leaderBoard", dataset.getPlayer)

app.get("/challenge",async function (req,res){
  res.render("challenge")
});

app.post("/register", geoExplorerAPIRoutes.register);

app.get("/api/questions/:country", geoExplorerAPIRoutes.getQuestions)
app.get("/api/names", geoExplorerAPIRoutes.getPlayerNames)
app.get("/api/moreInfo", geoExplorerAPIRoutes.getMoreInfo)

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));
