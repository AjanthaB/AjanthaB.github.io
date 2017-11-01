---
layout: post
title:  "NPM"
date:   2017-10-13 06:20:39
categories: node.js
---

## **Node.js Package Manger**

### **work with npm**

NPM, known as Node Package Manager that comes default with node.js. It is a totally free open source project. npm runs through the command line and manages dependencies for node.js applications. It also allows users to install Node.js applications that are available on the npm registry. npm is written entirely in JavaScript and was developed by **Isaac Z. Schlueter**.

The official site for npm is [http://search.npmjs.org/](http://search.npmjs.org/). You can download any existing package through the npm. You will see how easy to work with npm.

When we install npm specified module will be installed in the current directory under node_modules folder. Once installed to your node_modules folder, you'll be able to use require() on them just like they were built-ins. Also, we can install packages both globally and locally as we wish. Let's start working with npm.

Before the start, lets read something about the **package.json** file. Go to this [link](https://docs.npmjs.com/files/package.json) and read about the package.json file. 

#### **NPM Commands**

To get any help about npm from itself type the following command.

``` shell
//Get help on npm
$ npm-help

//Synopsis
npm help <term> [<terms..>]
//Description
```

If you supplya topic, then it show the appropriate documentation page. If the topic does not exist, or if multiple terms are provided, then run the help-search command to find a match. Note that, if help-search finds a single subject, then it will run help on that topic, so unique matches are equivalent to specifying a topic name.

##### **npm config**

``` shell
$ npm config ls -l
  ; default values
  access = null
  also = null
  always-auth = false
  bin-links = true
  browser = null
  ca = null
  cache = "/Users/ajanthabandara/.npm"
  cache-lock-retries = 10
  cache-lock-stale = 60000
  cache-lock-wait = 10000
  cache-max = null
  cache-min = 10
  cafile = undefined
...
```
Run **npm config ls -l** to see a set of configuration parameters that are internal to npm, and are defaults if nothing else is specified.

#### **Shorthands and Other CLI Niceties**

The following shorthands are parsed on the command-line

``` shell
  $ -v: --version
  $ -h, -?, --help, -H: --usage
  $ -s, --silent: --loglevel silent
  $ -q, --quiet: --loglevel warn
  $ -d: --loglevel info
  $ -dd, --verbose: --loglevel verbose
  $ -ddd: --loglevel silly
  $ -g: --global
  $ -C: --prefix
  $ -l: --long
  $ -m: --message
  $ -p, --porcelain: --parseable
  $ -reg: --registry
  $ -f: --force
  $ -desc: --description
  $ -S: --save
  $ -D: --save-dev
  $ -O: --save-optional
  $ -B: --save-bundle
  $ -E: --save-exact
  $ -y: --yes
  $ -n: --yes false
  $  ll and la commands: ls --long
```

#### **npm init**

This very important command and will ask you a bunch of questions and then write a **package.json** file for you.
``` shell
  $ npm-init
  //Interactively create a package.json file
  $ npm init [-f|--force|-y|--yes]
```

It attempts to make reasonable guesses about what you want things to be set to, and then writes a package.json file with the options you've selected. If you already have a package.json file, it'll read that first, and default to the options in there.

It is strictly additive, so it does not delete options from your package.json without a really good reason to do so.
If you invoke it with -f, --force, -y, or --yes, it will use only defaults and not prompt you for any options
If you provide **-y** flag at the end, all the questions will be ommited and create a package.json file with default configurations.

#### **npm install**

This command is used to install a package and any packages that it depend on.

``` shell
  $ npm install
    //Synopsis
  $ npm install (with no args, in package dir)
  $ npm install [<@scope>/]<name>
  $ npm install [<@scope>/]<name>@lttag>
  $ npm install [<@scope>/]<name>@ltversion>
  $ npm install [<@scope>/]<name>@<version range>
  $ npm install <tarball file>
  $ npm install <tarball url>
  $ npm install <folder>
  //alias: npm i
  //common options: [-S|--save|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [--dry-run]
```

**A package is:**

* **a folder containing a program described by a package.json file**
* **a gzipped tarball containing (a)** 
* **a url that resolves to (b)**
* **a \<name/>@\<version\> that is published on the registry (see npm-registry) with (c)**
* **a /<name\>@[tag (see npm-dist-tag) that points to (d)**
* **a /<name\> that has a "latest" tag satisfying (e)**
* **a /<git remote url\> that resolves to (a)**


npm install (in the package directory, no arguments) Install the dependencies into the local **node_modules** folder in the current directory. In global mode (ie, with -g or --global appended to the command), it installs the current package context (ie, the current working directory) as a global package. By default, npm install will install all modules listed as dependencies in package.json. With the --production flag(or when the NODE_ENV environment variable is set to production), npm will not install modules listed in devDependencies(devDependencies- dependencies that does not use in production).

**npm install \<folder\>**: Install a package that is sitting in a folder on the filesystem.

**npm install \<tarball file\>**: Install a package that is sitting on the filesystem.

**npm install \<tarball url\>**: Fetch the tarball url, and then install it. In order to distinguish between this and other options, the argument must start with "http://" or "https://"

``` shell
 // example
  $ npm install https://github.com/indexzero/forever/tarball/v0.5.6
```
``` shell
npm install [<@scope>/]<name> [-S|--save|-D|--save-dev|-O|--save-optional]:

``` 
Do a \<name\>@\<tag\> install, where \<tag\> is the "tag" config. In most cases, this will install the latest version of the module published on npm

npm install takes 3 exclusive, optional flags which save or update the package version in your main package.json: 
**-S, --save**: Package will appear in your dependencies. 
**-D, --save-dev**: Package will appear in your devDependencies. 
**-O, --save-optional**: Package will appear in your optionalDependencie

#### **Examples**
``` shell
  $ npm install sax --save
  $ npm install githubname/reponame
  $ npm install @myorg/privatepackage
  $ npm install node-tap --save-dev
  $ npm install dtrace-provider --save-optional
  $ npm install readable-stream --save
```


#### **Install specif package**

Install the specified version of the package. This will fail if the version has not been published to the registry.
``` shell
npm install [<@scope>/]<name>@<version7gt:
```

#### **Examples**

``` shell
  $ npm install sax@0.1.1
  $ npm install @myorg/privatepackage@1.5
```


#### **npm proxy**

If you are behind the proxy you can use this command to add proxy
``` shell
  // set proxy
  $ npm config set http proxy "http://host:port"
    // if you have username and password
  $ npm config set proxy "http://domain%5Cusername:password@servername:port/"
  // check proxy
  $ npm config get proxy
  // remove proxy
  $ npm config delete proxy
```

There are a lot of commands that are not shown here. I will explain important command later with development.

If you want more details about npm install to use this [link](https://docs.npmjs.com/cli/install)