const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const env = require("dotenv").load();
const exphbs = require("express-handlebars");
const router = express.Router();
const flash = require("connect-flash");

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(
  session({
    secret: "rHUyjs6RmVOD06OdOTsVAyUUCxVXaWci",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Handlebars
const viewsPath = path.join(__dirname, "views");
const layoutsPath = path.join(viewsPath, "layouts");
const partialsPath = path.join(viewsPath, "partials");
app.set("views", viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: "main",
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: ".hbs"
});

app.engine("hbs", exphbsConfig.engine);
app.set("view engine", ".hbs");

// Models
const models = require("./models");

// Express static assets
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Routes
const authRoute = require("./controllers/auth.js")(app, passport);
//const gameRoute = require("./controllers/gameController.js")(app, passport);

// Load passport strategies
require("./passport.js")(passport, models.user);

//Api/Html routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Sync Database
models.sequelize
  .sync({})
  .then(function() {
    console.log("Database Connected");

    app.listen(3000, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected at http://localhost:3000");
      }
    });
  })
  .catch(function(err) {
    console.log(err, "Error on Database Sync. Please try again!");
  });
