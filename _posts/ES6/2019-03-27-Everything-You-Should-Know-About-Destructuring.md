---
layout: post
title:  "Everything You Need to Know About Destructuring in ES6"
date:   2019-03-27 10:45:39
categories: javascript es6 js
---

# **Everything You Need to Know About Destructuring in ES6**

This article is about destructuring feature in depath in ES6. If you dont know what is destructuring is

**The destructuring lets you to exatract values from arrays, or properties from objects, into distinct variables like bellow.**

You will be good at destructuring after reading this article. Let's start then

## **Destructuring a Array**

``` js
const [a, b] = [10, 20]
// a = 10, b = 20

// reset of the values to a another variable
const [a, b, ...c] = [10, 20, 30, 40]
// a = 10, b = 20, c = [30, 40]

const [a] = [10, 20, 30]
// a = 10

// with default values
const [a = 1, b = 2, c = 3] = [10, 20]
// a = 10, b = 20, c = 3

// ignore the values
const [a, ,b] = [10, 20, 30]
// a = 10, b = 30

// return value from a function
const func = () => [1,2,3,4]
const [a, b] = func()
// a = 1, b = 2
```

## **Destructuring a Object**

### **Access with same keys**

``` js
const obj = {a: 10, b:20}
const {a, b} = obj;
// a = 10, b = 20
```

### **Assign to new keys**

``` js
const obj = {a: 10, b:20}
const {a: x, b: y} = obj;
// x = 10, y = 20
```

### **Same as arrays we can provide default values**

``` js
const obj = {a: 10}
const {a = 1, b = 2} = obj;
// a = 10, b = 2
```

### **Nested Arrays and Object destructuring**

``` js
const oo = {
  users: [
    { imgs: [{url: "http://example.com"}],
      username: "Ajantha"
    }
  ],
  pages: {numOfPages: 1, limit: 5}
}

const {users:[{imgs:[{url: imgUrl}]}], pages: {limit}} = oo

// imgUrl = "http://example.com", limit = 5
```

### **Pass destructuring object to function.**

``` js
var PrintUserName = ({user: {username}}) => console.log(username)
PrintUserName({user: {username: "Ajantha", password: ""}});
// 
```

### **Use destructuring in a for loop**

``` js
var users = [
  {imgs: [{url: "http://example.com"}],
    username: "Ajantha"
  }
]

for (const {imgs: [{url}], username:un} of users) {
  console.log(url, un);
}
// "http://example.com"  "Ajantha"
```

### **Use destructuring in a Function output**

``` js
function getMinMax() {
  return {
    min: 1,
    max: 100
  }
}

const { min, max } = getMinMax();
// min = 1, max = 100

```

### **Use destructuring when import ES6 module**

``` js
import { func1, func2 } = require("moduleName");

```

Thak you. If you find this tutorial helps you, Please share this.
