---
layout: post
title:  "JWT Authentication with Express.js and Express-jwt"
date:   2018-02-25 08:03:39
categories: express.js
---

## **JWT Authentication with Express.js and Express-jwt**

#### What is **jwt** ?

A JSON Web Token (JWT) is a JSON object that is defined in [RFC 7519](https://tools.ietf.org/html/rfc7519) as a safe way to represent a set of information between two parties. The token is composed of a header, a payload, and a signature.

Bellow diagram shows the how jwt work with Client and ther Server

![diagram](https://cdn.auth0.com/content/jwt/jwt-diagram.png)


In this example client send a login request(username and password) to server and if the login process success the server send a **jwt** token to client. Client need to send that token with each http request and server check that token valid or not. If valid send the correct response to user.


There are lot of middlewares to implement jwt authentication in node.js, But I'm going to use following middlewares

* express.js - nodejs framework
* express-jwt - jwt middleware that use [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) module
* body-parser - to parse a body as json


In this tutorial I'm not going to cover project architecture part. I'm just writing an example code to make this very simple and undastandable.

First initialize a project using **npm**. I have coverd this in a previus tutorial [see npm init command](http://localhost:4000/express.js/2017/10/13/Express-Simple-REST-API.html).

``` shell

mkdir jwt-authentication
cd jwt-authentication
npm init
// complete the process and it will create a package.json file for our project.

```

let's install other packages.

``` shell

npm install express express-jwt --save

```

above commad will install the express framework and express-jwt midleware to hadle our token generation an validation part.

**app.js**

``` javascript
const express = require("express");
const expressjwt = require("express-jwt");

const app = express();

app.get("/uses", (req, res) => {
 const users = [{"name": "Ajanha"}];

 res.json(users);
});

app.listen(5000, (err) => {
 if (err) {
  console.log("Error: ", err);
 } else {
  console.log(" Server is running on http://localhost:5000");
 }
});
```

Above code will start a simple node.js server and return array of users. Open the browser or postman and try to retive users.
[http://localhost:5000](http://localhost:5000);

![users]({{"/assets/jwt-auth/users.png"}})

You can get the users data from above end pont. Now, let's add the jwt middleware.

add bellow code line to the application
**app.js**
``` javascript

...
const app = express();

app.use(expressjwt({secret: "jwt-auth"}));

...

```

Now try to access the **"/users"** end point. You connot. Getting en error like bellow.
![error]({{"/assets/jwt-auth/auth-error.png"}})

Then how do we get a token if we can't access the any and point without token. We can, express-jwt provide a way for that. We can use **unless()** function that provide by the express-jwt middleware.

let's create an another end point that does not expect a jwt token.
**app.js**
``` javascript

...
const app = express();

app.use(expressjwt({secret: "jwt-auth"}).unless({path: ["/auth"]}));

app.get("/auth", (req, res)  => {
  res.json("Token not required for this end point");
});

...
```
You can add any number of end points to **unless()** function. Now you can access the new end pont [http://localhost:5000/auth](http://localhost:5000/auth).
![no-jwt]({{"/assets/jwt-auth/no-jwt.png"}})


Now we can implement the jwt token returning part. Let's do that

**app.js**
``` javascript

...
const jwt = require('jsonwebtoken');
const app = express();

app.use(expressjwt({secret: "jwt-auth"}).unless({path: ["/auth"]}));

app.get("/auth", (req, res)  => {
  
  // this should be post request in a real scenario. Also nedd to vaidate the user from database.
  const user = {username: "ajantha", password: "password"};

  jwt.sign({ username: user.username,role: "admin" }, "jwt-auth", (err, token) => {
    if (!err) {
      return res.json({ error: false, token });
    } else {
      return res.json({ error: true, message: "Token generation field. Try again" });
    }
  });
});

...
```

This is an example. In a real situation you need to validate the username, password and neccessory data to return a token. I'm just send a token for dummy user.
Now try to get a token from accessing the url [http://localhost:5000/auth](http://localhost:5000/auth).
![no-jwt]({{"/assets/jwt-auth/token.png"}})

Now you have a token. Let's try to fetch users. For that we need to apend this token in the header. We can use postman like bellow.
![no-jwt]({{"/assets/jwt-auth/postman.png"}})


Wow, now it's working. Like this you can protect any routes using with jwt. Also we can use jwt to handle authorization in the application. We can apend user roles or roles based data to token. When this token verify in the server side **express-jwt** midleware add this data into request. We can access these token data using **req.user** in middleware.

``` javascript

app.get("/users", (req, res) => {
 const user = req.user; // user object contains all data we append in the token generation function. we can use this to authorize routes. like bellow

 if (user && user.role === "admin") {
	// this is a admin user
 } else {
	// user canot access this routes.
 }
});

```

You can download the full source code from [here](https://github.com/AjanthaB/Express-Jwt-Authentication-Starter);

Thak you. If you find this tutorial helps you, Please share this.