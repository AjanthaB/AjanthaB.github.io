---
layout: post
title:  "ES6 Features You may not know"
date:   2018-07-15 07:04:39
categories: javascript es6 js
---

# **ES6 Features You may not know**

This article contains the new features of **ES6** You may not know yet.


- **Variable Swapping**
- **Spread Operator**
- **Computed Properties**
- **Generators**
- **Destructuring Objects and Arrays**


## **Variable Swapping**

Now is't very easy to swap two variable.
``` js
var a = 10, b =20;

[a. b] = [b, a];

console.log(a, b);
// output 20, 10

```


## **Spread Operator**

Spread syntax allows an iterable such as an array expression or string to be expanded in places 
where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

### **Spread in function calls**

``` js

function func(x, y, z) { }
var args = [0, 1, 2];
func(...args);

```

### **Spread in array literals**

``` js
var nums = ['100', '200']; 
var newNums = ['10', ...nums, '300', '400']; 
// ["10", "100", "200", "300", "400"]

```

Copy or Concat Arrays

``` js
// create a copy of array
var array = [1,2,3,4,5]
var copy = [..array]
// [1,2,3,4,5]

// concatenate arrays
var arr1 = [1,2,3]
var arr2 = [4,5,6]

var newArray = [...arr1, ...arr2]
// [1,2,3,4,5,6]

```

### **Spread in object literals**

Shallow-cloning (excluding prototype) or merging of objects is now possible using a shorter syntax than 

**Object.assign()**.

``` js
var obj1 = {a:10, b: 20}
var obj2 = {x: 30, y:40}

var newCopy = {...obj1}
// {a:10, b: 20}


var newObj = {...obj1, ...obj2}
// {a:10, b: 20, x: 30, y:40}

```

## **Computed Properties**

``` js

// Shorthand property names
var a = 'foo', b = 42, c = {};
var o = {a, b, c};
// {foo: 'foo', b: 'b', c: {}}

// Computed property names (ES2015)
var prop = 'foo';
var o = {
  [prop]: 'hey',
  ['b' + 'ar']: 'there'
};
// {'bar': "there"}


var o = {
  [(x => x % 2 === 0  ? 'even' : 'odd')(5)]: 5
}
// {odd: 5}


```

## **Generators**

Generators are functions which can be paused the execution and resume later. Their context (variable bindings) will be saved across re-entrances. 
Generators are very helpful when come promises. Now we can avoid **Callback Hell** still keeping the asynchronous manner and code looks like synchronous.

Calling a generator function does not execute its body immediately; an iterator object for the function is returned instead. When the iterator's next() method is called, the generator function's body is executed until the first yield expression, which specifies the value to be returned from the iterator or, with yield*, delegates to another generator function. The next() method returns an object with a value property containing the yielded value and a done property which indicates whether the generator has yielded its last value as a boolean. Calling the next() method with an argument will resume the generator function execution, replacing the yield expression where execution was paused with the argument from next(). 

When execution is finished, will return a generator object with a **done** set to **true** and result set to **value**.
Execution will finished if throws any errors inside the body. Errors needs to handle inside the body. otherwise will return a object as {value: undefined, done: true}.

``` js

function* increment() {
  var i = 0;
  while (i < i+1)
    yield i++;
}

var gen = increment();
console.log(increment.next()) // {value: 0, done: false}
console.log(increment.next()) // {value: 1, done: false}
console.log(increment.next()) // {value: 1, done: false}


// calculate fibonacci numbers
var fibonacci = function*(){
  let pre = 0, cur = 1;
   while (pre < 1000) {
     // Here we destruct the former state
     [pre, cur] = [cur, pre + cur];
     // and yield (return) each step
     yield pre;
   }
}();

for (var n of fibonacci) {
  console.log(n);
}
```


## **Destructuring**

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables like bellow.

### **Destructuring a Array**

``` js
var [a, b] = [10, 20]
// a = 10, b = 20

// reset of the values to a another variable
var [a, b, ...c] = [10, 20, 30, 40]
// a = 10, b = 20, c = [30, 40]

var [a] = [10, 20, 30]
// a = 10

// with default values
var [a = 1, b = 2, c = 3] = [10, 20]
// a = 10, b = 20, c = 3

// ignore the values
var [a, ,b] = [10, 20, 30]
// a = 10, b = 30

// return value from a function
var func = () => [1,2,3,4]
var [a, b] = func()
// a = 1, b = 2
```

### **Destructuring a Object**

**Access with same keys**

``` js
var obj = {a: 10, b:20}
var {a, b} = obj;
// a = 10, b = 20
```

**Assign to new keys**
``` js
var obj = {a: 10, b:20}
var {a: x, b: y} = obj;
// x = 10, y = 20
```

**Same as arrays we can provide default values**
``` js
var obj = {a: 10}
var {a = 1, b = 2} = obj;
// a = 10, b = 2
```

**Assign to new keys with default values**
``` js
var obj = {a: 10}
var {a:x = 1, y:b = 2} = obj;
// x = 10, y = 2
```

### **Nested Arrays and Object destructuring**

``` js
var oo = {
  users: [
    { imgs: [{url: "http://example.com"}],
      username: "Ajantha"
    }
  ],
  pages: {numOfPages: 1, limit: 5}
}

var {users:[{imgs:[{url: imgUrl}]}], pages: {limit}} = oo

// imgUrl = "http://example.com", limit = 5
```

**Pass destructuring object to function.**

``` js
var PrintUserName = ({user: {username}}) => console.log(username)
PrintUserName({user: {username: "Ajantha", password: ""}});
// "Ajantha"
```

**Use destructuring in a for loop**

``` js
var users = [
  {imgs: [{url: "http://example.com"}],
    username: "Ajantha"
  }
]

for (var {imgs: [{url}], username:un} of users) {
  console.log(url, un);
}
// "http://example.com"  "Ajantha"
```

Thak you. If you find this tutorial helps you, Please share this.