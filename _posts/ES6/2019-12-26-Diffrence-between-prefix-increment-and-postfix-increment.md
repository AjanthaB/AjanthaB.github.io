---
layout: post
title:  "Difference between ++x vs x++"
date:   2019-12-26 07:57:39
categories: javascript es6 js
---

# **Difference between ++x and x++**

## What we should used ++x or x++ when increment x?

#### Some people say ++x and others x++, but actually what we shoud used, let's find out


When you use ++x in a expression or someware in the program
> **first x will increment by 1(and return the value) and evaluate the expression**

**example**

```js
let x = 1;
console.log(++x) // will print the value as 2
// now x = 2

// or
let y = 1;
if (++x === x) // true
```

When  you use x++ in a expression or someware in the program
> **first x will evaluate in the current expression and increment by a 1(return the value)**

**example**

```js
let x = 1;
console.log(x++); // will print the value as 1
// now x =2

// or
let y = 1;
if (y++ === y); // false
```

### **Further more**

```js
let x = 1;
console.log(++x);

// is same as

let x = 1;
x = x + 1;
console.log(x);
```

and

```js
let x = 1;
console.log(x++);

// is same as

let x = 1;
console.log(x);
x = x + 1;
```

I'm pretty sure that there are cases where you need to use ++x and x++. But, I think it is better to write full expression(rather shortend), because is more readable and understaderble.

Feel free to put comment if you have any questions.