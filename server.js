const express = require("express");
const path = require("path");
const hbs = require("express-hbs");
const expressSession = require("express-session");
const passport = require("./passport/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//statically holding the public folder//
app.use("/public", express.static(path.join(__dirname + "/public")));

//view engine//
// app.set("view engine",'hbs')
// app.set('views','views')
// app.engine('hbs',hbs.express4({
//     defaultLayout:path.join(__dirname,'views/layout/default'),

// }))
//express-session//
app.use(
  expressSession({
    secret: "easy very easy",
    resave: false,
    saveUninitialized: false
  })
);

//passport//
app.use(passport.initialize());
app.use(passport.session());
//routes

app.use("/admin", (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin") {
      // console.log("done")
      next();
    }
  } else {
    // console.log("wrong user")
    res.redirect("/auth/signin");
  }
});

app.use("/user/", (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === "Transport Head") {
      // console.log(req.url)
      if (!req.url.includes("/transportHead")) {
        //so that other authenticated user can't use this profile
        res.redirect("/auth/signin");
      } else {
        //console.log("done")
        next();
      }
    } else if (req.user.role === "Depot Manager") {
      //console.log(req.url)
      if (!req.url.includes("/depotManager")) {
        //so that other authenticated user can't use this profile
        //console.log("NO");
        res.redirect("/auth/signin");
      } else {
        //console.log("done")
        next();
      }
    } else {
      res.status(511).send({
        code: "511",
        success: false,
        message: "Network Authentication required"
      });
    }
  } else {
    //console.log("wrong user")
    res.redirect("/auth/signin");
  }
});

//some static files//
app.use("/bootstrap&jquery", express.static(__dirname + "/bootstrap&jquery"));

app.use("/", express.static(__dirname + "/public_html/home"));
app.use("/admin", express.static(__dirname + "/public_html/admin"));
app.use("/user", express.static(__dirname + "/public_html/user"));
app.use(
  "/auth/signin",
  express.static(__dirname + "/public_html/auth/signin.html")
);
app.use(
  "/auth/signup",
  express.static(__dirname + "/public_html/auth/signup.html")
);

// app.use("/auth/signin", express.static(__dirname + "/public_html/auth/signin"));
// app.use("/auth/signin", express.static(__dirname + "/public_html/auth/signup"));

/**various routes**/
app.use("/api/v1/", require("./routes/api_v1"));
app.use("/auth", require("./routes/Rauth"));
app.listen(2500, () => {
  console.log("http://localhost:2500");
});
