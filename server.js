const pg = require("pg");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const hostname = "localhost";
const bodyParser = require('body-parser');

const saltRounds = 10;

const env = require("./env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

// app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/test", function (req, res) {
  console.log(req.body);
  res.status(200);
  res.send({"username":req.body.username, "password": req.body.password});
})

app.post("/user", function (req, res) {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;

  if( username == undefined || password == undefined ){
    // body must have username and password keys
    res.status(401);
    res.send();
  }else if( !(typeof username === 'string') || !(typeof password === 'string') ){
    // check if username and password are strings
    res.status(401);
    res.send();
  }else if( username.length < 1 || username.length > 20 ){
    // check if username length >= 1 and <= 20
    res.status(401);
    res.send();
  }else if( password.length < 5 || password > 30 ){
    // check if password length >= 5 and <= 36
    res.status(401);
    res.send();
  }

  // TODO check if username already exists
  pool.query("SELECT username FROM users WHERE username = $1", [username])
  .then( function (user) {
    if( user.rows.length !== 0 ){
      console.log("existed user")
      res.status(401).send();
    }else{
      bcrypt
        .hash(password, saltRounds)
        .then(function (hashedPassword) {
          pool.query(
            "INSERT INTO users (username, hashed_password) VALUES ($1, $2)",
            [username, hashedPassword]
          )
          .then(function (response) {
            // account successfully created
            console.log("added user to auth_db")
            res.status(200).send();
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
          });
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).send(); // server error
        });
    }
  });


});

app.post("/auth", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    pool.query("SELECT hashed_password FROM users WHERE username = $1", [username])
    .then(function (response) {
      if (response.rows.length === 0) {
        // username doesn't exist
        return res.status(401).send();
      }
      let hashedPassword = response.rows[0].hashed_password;
      bcrypt
      .compare(password, hashedPassword)
      .then(function (isSame) {
          if (isSame) {
            // password matched
            res.status(200).send();
          } else {
            // password didn't match
            res.status(401).send();
          }
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send(); // server error
      });
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(); // server error
    });
});


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
