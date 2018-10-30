module.exports = (app, passport) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/signin", (req, res) => {
    res.render("signin");
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home",
      failureRedirect: "/signup"
    })
  );

  app.get("/home", isLoggedIn, (req, res) => {
    res.render("home");
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.redirect("/");
    });
  });

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/home",
      failureRedirect: "/signin"
    })
  );

  app.get("/game", function(req, res) {
    res.render("game");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
<<<<<<< HEAD

  app.get("/game", function(req, res) {
    res.render("game");
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
=======
>>>>>>> d2b8f0a36689be0a18ac25f114647c186b890f48
};
