---
layout: post
title:  "Simple REST API with Express.js"
date:   2017-10-13 08:44:39
categories: express.js
---

### **Simple REST API with node.js and express Framework**


#### What is **REST** ?,  
REST stands for **Representational State Transfer** which essentially refers to a style of web architecture that has many underlying characteristics and governs the behavior of clients and servers.

This tutorial is about creating a simple REST API using **Express.js** framework and **node.js**. Express.js is light weight webframework for server side development in javascript. It is very easy to understand and learn. You can read more information [here](https://expressjs.com/).

You can download the source code from [here](https://github.com/AjanthaB/Simple_REST_API_with_Express).

First create a Directory and change to that directory. Type the following command to initialize the project. make sure that you have install the **node.js**, if not read my previouse tutorial  [how to Install node.js](/node.js/2017/10/12/Install-Node.js.html).

``` shell
    npm init
```

And give the answers to question. If you want to skip this process type following command. This will skip the question and create a **package.json** file for you.

``` shell
    npm init -y
```
![init]({{"/assets/simple_rest_api/init.png"}})

Next, let's install the **express.js** module. Type the following command in the terminal.

``` shell
    npm i express --save
```
![express]({{"/assets/simple_rest_api/install.png"}})

This will save the express module in **node_modules** folder inside your directory. Also add express module into your package.json file. You can find more detils about **npm** commands from [here](https://docs.npmjs.com/).

Now create project strucure as bellow. This project structure will give you more plexibility to maintain you code base. This is for simple REST applicatiom. I will discuss more advanceed project architecture in another tutorial.

![structure]({{ "/assets/simple_rest_api/structure.png" | absolute_url }})

Now create a **express.js** file inside the **config** folder and add add following code. Using this module we can  get instance of express application.
For now **initializeAppConfigs** method and **initializeServerRoutes** method is empty. We will update it after implement our first route.

**express.js**
``` javascript
const express = require("express");

/**
 * @desc - initialize other application configurations
 */
module.exports.initializeAppConfigs = (app) => {

}

/**
 * @desc - initialize the all sever routes (REST end points);
 */
module.exports.initializeServerRoutes = (app) => {
  
}

/**
 * @desc - initialize the application
 */
module.exports.init = () => {
  const app = express();

  this.initializeAppConfigs(app);
  this.initializeServerRoutes(app);

  return app;
}
```

In here **init** method create an express instance and return it. We can invoke this function anyware like bellow.
``` javascript
const express = require("./path_to_express.js");

express.init();
```

After that create **app.js** file inside the **config** folder and write following code block. This is the module  that we are going to access from **server.js** file.

**app.js**
``` javascript
const express = require("./express");

/**
 * @desc - create an instance of exress and invoke the callback
 */
module.exports.init = (callback) => {
  const app = express.init();
  if (callback) callback(app);
}

/**
 * @desc - start the express application and listen on http://localhost:5000
 */
module.exports.start = () => {
  const _this = this;
  _this.init((app) => {
    app.listen(5000, (err) => {
      if (err) console.log(err);
      console.log("Application is running on localhost port:5000");
    })
  })
}
```

Now we can edit the **server.js** file. This file is the our main executable file. We run this file to start the application. Let's create function for start our application.

**server.js**
``` javascript
const app = require("./config/app");

// start the application.
app.start();
```

Now we can start out server. Type
```shell
  node server.js
```
we can see the output as follows. 

![running]({{"/assets/simple_rest_api/running.png"}})

Wow! our simple application is running. Let's create our first end point. Our first end point is **"http://localhost:5000/api/v1/users"** for retrive the all users.

create a new file **user.controller.js** inside the **controller** directory and add bellow code block.
```javascript
/**
 * @desc - module for get all form our database, in here I'm seding an dummy users array for testing. Keep remember to send correct response code as * * best practice
 * @param {Request} req - http request comming from the client
 * @param {Response} res - http response that send to client
 */
module.exports.getUsers = (req, res) => {
  const users = [{
    firstName: "Ajantha",
    lastName: "Bandara"
  }];

  // send the response as json.
  return res.status(200).json(users);
}
```
Next add this handler into **route** module. Create a file **user.routes.js** inside the **routes** directory and add the following code.
```javascript
// import the user controller module
const userController = require("../controllers/user.controller");

/**
 * @desc - export the route module with defined routes
 * @param app - is the express instance
 */
module.exports = (app) => {
  // first parameter of the route function is string that contain out end pont
  app.route("/api/v1/users")
    .get(userController.getUsers); // request type. In this case HTTP GET
    // .post()
    // .put()
    // .delete()
}
```

Now our route is completed. Next we need to configure this route in application startup. For that we should add this route module into **express.js** module like bellow.

```javascript
const express = require("express");


/**
 * @desc - initialize other application configurations
 */
module.exports.initializeAppConfigs = (app) => {
  
}

/**
 * @desc - initialize the all sever routes (REST end points);
 */
module.exports.initializeServerRoutes = (app) => {
  require("../routes/user.routes")(app);
}

/**
 * @desc - initialize the application
 */
module.exports.init = () => {
  const app = express();

  this.initializeAppConfigs(app);
  this.initializeServerRoutes(app);

  return app;
}
```

Finaly run the application again and type the following url in the browser window. You can see the output as follows.

![final]({{"/assets/simple_rest_api/result.png"}})

Greate, our simple REST API is finish. Add the any number of routes and the handlers to you application as you wish. But for Testing purpose we can add another module callled **Morgon** to loggin incomming request to our application.

Type the following command and Add bellow code block to **express.js** file.
```shell
  npm i morgan --save-dev
```

**express.js**
```javascript
const express = require("express")
      morgan = require("morgan");


/**
 * @desc - initialize other application configurations
 */
module.exports.initializeAppConfigs = (app) => {
  app.use(morgan("dev")); // in express we can register middlewares using app.use() function.
}

/**
 * @desc - initialize the all sever routes (REST end points);
 */
module.exports.initializeServerRoutes = (app) => {
  require("../routes/user.routes")(app);
}

/**
 * @desc - initialize the application
 */
module.exports.init = () => {
  const app = express();

  this.initializeAppConfigs(app);
  this.initializeServerRoutes(app);

  return app;
}
```
Now restart the application and refresh the browser window. You can see the request have been logged inther terminal. This is very helpful when developing a rest api with express. 

![morgan]({{"/assets/simple_rest_api/morgan.png"}})

morgan middleware has few loggin levels. We are using **dev** login level. When register a middleware in express we can use **app.use()** method very easily. more information about express midleware registering can read from [here](http://expressjs.com/en/guide/using-middleware.html) and details of morgan can read from [here](https://www.npmjs.com/package/morgan).

Also express have thousond of middlewares. It's not easy cover all the middlewares. But I will cover most important middlewares that we can use with express framework in another tutorial. Untill that Good Cording.

Thanks.