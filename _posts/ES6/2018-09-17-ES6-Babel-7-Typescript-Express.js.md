---
layout: post
title: "Configure Typescript, ES6, Babel 7 and Express.js"
date: 2018-09-17 10:05:39
categories: javascript es6 js
---

# **Configure Typescript, ES6, Babel 7 and Express.js**

Babel 7 was released, so I decided to setup a latest tech stack Typescript 3, Babel 7 and Express.js. Pretty awsome right!. Lets start.

First create a new directory and initialize the project using bellow npm commad. **-y** keyword will omit all the configuration for package.json file.

``` bash
npm init -y
```

### **Lest's setup Babel 7 and node.js first.**

install bellow dependencies

``` bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

After that finishes installing, your package.json file should include

``` json
{ ...
  "devDependencies": {
    "@babel/cli": "^7.0.0",
    "@babel/core": "^7.0.0"
  }
  ...
}
```

Now create a **src** folder and add a **server.js** file.

**server.js**
```js
const name = 'Ajantha';

console.log(`Hello ${name}`);
```

Next add this script into to your **package.json** file
``` json
{ ...
  "scripts": {
    "build": "babel src --out-dir dist"
  }
  ...
}
```

Now you need to create a .bablerc file and add this. In Babel, a **preset is a set of plugins used to support particular language features**.

* @babel/preset-env: is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!. Read [more](https://babeljs.io/docs/en/babel-preset-env) details

```
{
  "presets": [
    "@babel/preset-env",
  ]
}
```

Next run this build command.

``` bash
npm run build
```

Now you will get the transpiled **server.js** file and the **dist** directory.

``` js
var name = 'Ajantha';
console.log("Hello ".concat(name));
```

We can configre babel to auo detect changes in **src** folder and transpile using **--watch** command.

``` json
{ ...
  "scripts": {
    "build": "babel src --watch --out-dir dist"
  }
  ...
}
```

Now we can use all features in ES6 without any issues. try to write some ES6 code and build.

### **Setup the TypeScript in our project**

To start install bellow dependencies

```bash
npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread
```

These plugins are need to transpile Typescript classes. Next we should add this plugins into our **.babelrc** file.

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/typescript"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

And then udate the build script as bellow and rename the **server.js** file to **server.ts**.

```json
"scripts": {
    "build": "babel src --out-dir dist --extensions \".ts, .tsx\" --source-maps inline",
  },
```

Let's write some Typescript code, add this to your server.ts file.

```ts
// person type
interface Person {
  name: string
}

function getPerson(): Person {
  return { name: 'Ajantha' };
}

let person: Person = getPerson();
```

Run the build command and see the output. The out put will be as follows.
**/dist/server.js**

``` js
function getPerson() {
  return {
    name: 'Ajantha'
  };
}

var person = getPerson();
```

Cool right, So far we integrate Typescript, Babel 7. Let's integrate our last one, express.js.

install the bellow dependencies in you project.

``` bash
npm i express @types/express --save
```

And replace your **server.ts** file with bellow code.

```ts
import express from 'express';

const app = express();

interface Message {
  text: string;
}

app.get('/test', (req, res) => {
  const message: Message = { text: 'Alantha' }
  res.json(message);
});

app.listen(5000, (err: any) => {
  if (err) {
    console.log('error starting server', err);
    return;
  }
  console.log('Server is running on port: 5000');
});
```

Done, Now we can use Types inside our express application. Go ahead and run the build command

``` bash
npm run build
```

And see the **/dist/server,js** file. Wow it's done.

```js
"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.get('/test', function (req, res) {
  var message = {
    text: 'Alantha'
  };
  res.json(message);
});
app.listen(5000, function (err) {
  if (err) {
    console.log('error starting server', err);
    return;
  }

  console.log('Server is running on port: 5000');
});
```

Let's add some cool stuffs to our project to make it more resposive.

### **Install nodemon**

Now are going to add **nodemon** to our application. The Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Intall the nodemon with npm command,

```bash
npm intall nodemon --save
```

Next add the **nodemon.json** file to project root and add the bellow content

```json
{
  "watch": [
    "src"
  ],
  "ext": "ts",
  "ignore": [
    "src/**/*.spec.ts",
    "dist",
    "node_modules"
  ],
  "exec": "npm run build && node dist/server.js"
}
```

After that add a new command to **package.json** file to run our project.

```json
 "scripts": {
    "start": "nodemon",
    "build": "babel src --out-dir dist --extensions \".ts, .tsx\" --source-maps inline",
    "serve": "node dist/server.js"
  },
```

Now you can run the **npm run** command to start your server and restart when you change the file content.

You can find the full source code of this project in my github project **[bentes6](https://github.com/AjanthaB/bentes6)**.

**If you think this is usefull please share the post and give a star to github project.**
