---
layout: post
title: "Webpack is not Difficult"
date: 2019-06-04 07:25:20
categories: javascript es6 js
---

# **Webpack is not difficult**

Yesterday I was reading a source code of a **React** project and I was not able to understand the build process of clearly. The reason was, it was written in **Typescript** and and **ES6** features which are not supported some of the modern browsers yet. Also I looked into the **package.json** file and realized all the configs was done using **webpack**. I was not quite not familiar with webpack until today.

I dig into webpack and find out some tutorials and also looked into the documentation of [**webpack**](https://webpack.js.org). After few minutes I realized documentation was pretty good and easy to understand. So, stoped reading other tutorials and started reading the documentation. After few hours I was able to understand the basics of the webpack and developed a simple code to test those feature and wanted to share with others.

Those who not know about **webpack**, **webpack is static bundler** for your javascript project. To get a clear idea see the below ficture.

![3]({{"/assets/webpack/3.png"}})

The webpack is very configurable and we can do much more things using webpack. This article contains the Basics of the webpack. If need more details read the [**documentation**](https://webpack.js.org).

First we need to install the **webpack-cli** and **webpack**. Normaly we use **webpack.config.js** file to configure the webpack. But with latest release of webpack( after verion 4.0) we don't need config file anymore. Webpack can find out the depedency graph of your project and buldle it for you.

``` bash
mkdir webpack-test
cd webpack-test
npm i -y
npm i webpack-cli -D
npm i webpack -D
touch webpack.config.js
```

To get started with webpack we need to understand the core concepts.

* **Entry**
* **Output**
* **loaders**
* **Plugins**
* **Mode**

## **Entry**

Entry is the place whare we define the starting point of the build process. Webpack can figure out the dependency graph based on the entry point. By default it is **./src/index.js** in your project. We can add multiple entry files and make multiple bundles.

**webpack.config.js**

``` js
module.exports = {
  entry: 'path/to/entry/file.js'
};
```

**entry: string `|` Array `<string>`**

This is the folder structure of the test project. We are going to use this for rest of the core concepts.

![1]({{"/assets/webpack/1.png"}})

now add the webpack command to **scripts** in package.json file and run

**package.json**

``` json
...
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
},
...
```

``` bash
npm run build

```

This will generate the **main.js**(buldled .js file) file in the **dist** folder.

![1]({{"/assets/webpack/2.png"}})

## **OutPut**

Output is the place where we define this final outcome. Default path is **./dis/main.js**.

``` js
const path = require('path');

module.exports = {
  entry: 'path/to/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first.bundle.js'
  }
};
```

This will generate a file which has the name **my-first.bundle.js** inside this **dis** folder. You can specify any name you want.
If you specify multiple files in entry point, will create multiple output files. But you need to give **unique** name for each file. We can do it simply s below.

``` js
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
};
```

This will generate two files with name **app.bundle.js** and **search.bundle.js**.

## **Loaders**

Webpack can only understand JS and JSON files. Loaders give capability to load other files like **.css** and convert them into valid bundles. Loaders accept two properties in webpack config.

* **test** - identify which file or files need should be transformed
* **use** - define which loader use to do the transforming.

We defines all the rules under the module. When define regex to match the files below expressions are not same.

> /\.txt$/ - all files with extension .txt

> '/\.txt$/' or "/\.txt$/" - will match a single with extension .txt

``` js
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {test: /\.ts$/, use: 'ts-loader'},
      {test: /\.css$/, use: 'css-loader'}
    ]
  }
};
```

There are many more options available for loader. Visit the documentation of the [**loader**](https://webpack.js.org/concepts/loaders).

## **Plugins**

The purpose of plugin is to do anything else that a loader cannot do. Webpack also build with same plugin system. The Plugin is a jacascript Object which has access to the entire compilation lifecycle. Since plugins can take arguments/options, you must pass a new instance to the plugins property in your webpack configuration

``` js
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
};
```

**babel-loader** will load and transpile your ES6 code snippets into browser compatible version with pollyfils.

**ProgressPlugin** is used provides a way to customize how progress is reported during a compilation

## **Mode**

By setting the mode parameter to either development, production or none, you can enable webpack's built-in optimizations that correspond to each environment. The default value is production.

Change your mode to development and see the generated bundle files.

``` js
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.ts',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
};
```

There are many more configuration options are available in webpack as you need in your project. These are basic concept you need to learn before moving to complex configurations. Also check webpack sourcode if you have a time.

Happy configuration with Webpack.
