const pg = require("pg");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const hostname = "localhost";

// number of rounds the bcrypt algorithm will use to generate the salt
// the more rounds, the longer it takes
// so the salt will be more secure
// https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
const saltRounds = 10;

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

console.log("dcm");

app.get("/", function (req, res) {
  console.log("dcm");
  res.status(200);
  res.json({"name":"tin", "product_id": "123456"});
})

app.post("/user", function (req, res) {

  let username = req.body.username;
  let plaintextPassword = req.body.plaintextPassword;

  if( username == undefined || plaintextPassword == undefined ){
    // TODO check body has username and plaintextPassword keys
    res.status(401);
    res.send();
  }else if( !(typeof username === 'string') || !(typeof plaintextPassword === 'string') ){
    // check if username and password are strings
    res.status(401);
    res.send();
  }else if( username.length < 1 || username.length > 20 ){
    // TODO check username length >= 1 and <= 20
    res.status(401);
    res.send();
  }else if( plaintextPassword.length < 5 || plaintextPassword > 36 ){
    // TODO check password length >= 5 and <= 36
    res.status(401);
    res.send();
  }

  // TODO check if username already exists
  pool.query("SELECT username FROM users WHERE username = $1", [username])
  .then( function (user) {
    if( user.rows.length !== 0 ){
      res.status(401);
      res.send();
    }
  });

  bcrypt
    .hash(plaintextPassword, saltRounds)
    .then(function (hashedPassword) {
      pool.query(
        "INSERT INTO users (username, hashed_password) VALUES ($1, $2)",
        [username, hashedPassword]
      )
      .then(function (response) {
        // account successfully created
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
});

app.post("/auth", function (req, res) {
    let username = req.body.username;
    let plaintextPassword = req.body.plaintextPassword;
    pool.query("SELECT hashed_password FROM users WHERE username = $1", [
        username,
    ])
    .then(function (response) {
      if (response.rows.length === 0) {
        // username doesn't exist
        return res.status(401).send();
      }
      let hashedPassword = response.rows[0].hashed_password;
      bcrypt
      .compare(plaintextPassword, hashedPassword)
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
