const pg = require("pg");
const cors = require("cors");
const bodyParser = require('body-parser');

const express = require("express");
const app = express();

const port = 4000;
const hostname = "localhost";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jwt-simple");
const secret = "finalProject";

const env = require("./env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

// app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/status", function (req, res) {
  // See if the X-Auth header is set
   if (!req.headers["x-auth"]) {
      res.status(401).json({error: "Missing X-Auth header"});
   }

   // X-Auth should contain the token
   var token = req.headers["x-auth"];
   try {
      var decoded = jwt.decode(token, secret);
      console.log(decoded);
   }
   catch (ex) {
    res.status(401).json({ error: "Invalid JWT" });
   }
});


app.post("/user", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if( username == undefined || password == undefined ){
    // TODO check body has username and password keys
    res.status(401);
    res.send();
  }else if( !(typeof username === 'string') || !(typeof password === 'string') ){
    // check if username and password are strings
    res.status(401);
    res.send();
  }else if( username.length < 1 || username.length > 20 ){
    // TODO check username length >= 1 and <= 20
    res.status(401);
    res.send();
  }else if( password.length < 5 || password > 36 ){
    // TODO check password length >= 5 and <= 36
    res.status(401);
    res.send();
  }

  // check if username already exists
  pool.query("SELECT username FROM users WHERE username = $1", [username])
  .then( function (user) {
    if( user.rows.length !== 0 ){
      res.status(401);
      res.send();
    }
  });

  // Create a table with 3 columns and the username as the title
  pool.query(`CREATE TABLE ${username}(date VARCHAR(10), priority VARCHAR(1), task VARCHAR(300))`)
  .catch(err => {console.error(err)} )

  bcrypt
  .hash(password, saltRounds)
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
          var token = jwt.encode({username: username}, secret);
          res.status(302).json({'token': token});
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

app.post("/add", function (req, res) {
  let user = req.body.user;
  let date = req.body.date.split("T")[0]; //cut time, in yyyy-mm-dd
  let priority = req.body.priority;
  let task = req.body.task;

  pool.query(`INSERT INTO ${user}(date, priority, task) VALUES($1, $2, $3);`,
                                  [date, priority, task]
  )
  .catch(err => {console.error(err)});

  res.status(200).send();
})

app.post("/get", function (req, res) {
  let user = req.body.user;
  let list;

  pool.query(`SELECT * FROM ${user};`)
  .then( response => {
    list = response.rows;
    console.log(list);
    res.status(200);
    res.json({list});
  })
  .catch( err => {console.error(err)} );
})

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
