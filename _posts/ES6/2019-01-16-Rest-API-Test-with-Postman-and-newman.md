---
layout: post
title: "REST API Test with Postman and Newman"
date: 2019-01-16 03:05:39
categories: javascript es6 js
---

# **Test REST API with Postman and Newman.**

REST API testing is very important when a project grows. Normaly what we do is use **Postman** or **Browser** to test our Rest APIs. In this article I'm going yo show you how to use those same Postman requests to test our API.

Tets can be run either using **CLI** or **POSTMAN**. I'm going to use a simple server application which was developed by myself in previous article. The project is **bentes6**.

**b** - Babel7

**e** - Expressjs

**n** - Nodejs

**t** - Typescript

**es6** - ES6

Let's start. First clone or download the project. If you are not interested of using **bentes6** project you can use your own project and end-points.

* Here is the github [URL](https://github.com/AjanthaB/bentes6).
* For more details read the article [ES6-Babel-7-Typescript-Express.js](http://blog.ajanthab.com/javascript/es6/js/2018/09/17/ES6-Babel-7-Typescript-Express.js.html)

## **Start the server**

Start the server after install the dependencies.

```bash
# install dependencies
npm i
...
# start the server
npm start
```

Theese are the end-points I'm going to test and same thing you can do for any end-point.

* **GET** - Fetch all users
> [http://localhost:8080/api/v1/users](http://localhost:8080/api/v1/users)

* **POST** - Create a new User
> [http://localhost:8080/api/v1/users](http://localhost:8080/api/v1/users)

* **PUT** - Update a User
> [http://localhost:8080/api/v1/users](http://localhost:8080/api/v1/users)

* **DELETE** - Delete a User
> [http://localhost:8080/api/v1/users/userId](http://localhost:8080/api/v1/users/userId)

## **Configure POSTMAN**

Open the the postman and create a new collection by clicking on the `+` icon as bellow. Give it a name and save.

![1]({{"/assets/rest-api-test/1.png"}})

Now send a **GET** request to fetch all the users using GET url and save it by clicking on `save` button. It will open new window to give a name and collection. Set name as **GET** and select the your collection as below. In my case **REST-TEST**.

![2]({{"/assets/rest-api-test/2.png"}})

Next select the **Tests** tab bellow the URL. Test snippets can be found in the right pane as bellow. Select the **Status code: code is 200** and it will add code snippet. Update the discription to a meaningfull text.

You can use the **pm** global object to access response data and all assertion options. If youre using your own server end-point change the Status code according to that one.

![3]({{"/assets/rest-api-test/3.png"}})

![4]({{"/assets/rest-api-test/4.png"}})

Let's implement the **POST** request.

We can access the json response object as **pm.response.json();**. Write the assertion to validate your schema. We can keep variable for later usage in postman. Read details about [variable](https://learning.getpostman.com/docs/postman/environments_and_globals/variables) in postman. Read the documentation to find more details.

I'm keeping userId in globals to use in next request. You can find **PUT** and **DELETE** requests in below.

![5]({{"/assets/rest-api-test/5.png"}})

![6]({{"/assets/rest-api-test/6.png"}})

### Update Request

For update request we can use **userId** which we saved in gloabs varialbes as below.

![7]({{"/assets/rest-api-test/7.png"}})

![8]({{"/assets/rest-api-test/8.png"}})

### **Delete request**

![9]({{"/assets/rest-api-test/9.png"}})

## **Collection Runner**

Now it's time to Run the all test together. Open the **Runner** window by clicking `Runner` button in the top let coner. In there select the collection we made. There are other configuration as well, keep those as it is for now and click the `RUN` button. It will give you nice summary of all the test cases as below.

![10]({{"/assets/rest-api-test/10.png"}})

## **Use CLI to run the all test**

For this you need to export this postman collection. For that click on the `more` icon and select `export` and save it inside your project.

![11]({{"/assets/rest-api-test/11.png"}})

Finaly, add the bellow code snippet inside your test directory to run the all postman collections inside the test directory. You need to install **newman** cli tool as dev-dependency to your project. for that use the bellow commad.

```bash
npm install newman --save-dev
```

**newman.js** file

```js
const newman = require('newman');
const fs = require('fs');

// read the current directory 
fs.readdir(__dirname, (err, files) => {
  if (err) { throw err; }

  // we filter all files with JSON file extension
  files = files.filter( (file) => {
    return (/^((?!(package(-lock)?))|.+)\.json/).test(file);
  });

  // now we iterate on each file name and call newman.run using each file name
  files.forEach( (file) => {
    newman.run({
      collection: require(`${__dirname}/${file}`),
      reporters: 'cli',
    }, function (err) {
      // finally, when the collection executes, print the status
      console.info(`${file}: ${err ? err.name : 'ok'}!`);
    });
  });
});
```

Now you are ready to run test collection using **newman cli**. Add the test start commad to your **package.json** file as bellow.

![12]({{"/assets/rest-api-test/12.png"}})

Now run the bellow commands. You will get a summary of all tes cases. You can integrate the report module to newman to get a nice test report.

```bash
npm run test:newman
```

![13]({{"/assets/rest-api-test/13.png"}})

You can find the full source code of this project in my github project **[bentes6](https://github.com/AjanthaB/bentes6)**.

If you think this article is helpfull please share and give a like to [facebook page](https://www.facebook.com/easynodejs/).