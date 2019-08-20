---
layout: post
title:  "PWA Series Article 1: Web Workers"
date:   2019-08-13 07:00:39
categories: javascript es6 js
---

## **PWA Series Article 1**

## **Web Workers**

This is the first article of the **PWA** article series. Before jump into the PWA we should have a basic idea about couple of Web Apis.
  You may have heard and it is the true, **Javsscript is Single Thread**. Does it mean that
we can't use more than one thread in javascript? **NO**, abosolutely not. We can you use multiple threads in our javascript application and lot of people don't know that. What will happen if you put below js code in your browser console and hit enter?

```js
while (some_condition) {
  // take 2min to comple
}
```

Your browser windows will not respond to any of the UI interaction and it's like freezed utill 2 minutes. Do you know why, because javacript is single thread and if you block the main thread rendering process will not have a time to execute, so UI will be very unresponsive. It will give you a very bad user experiance. Then how will you handle these kind of operations, that we called the CPU intensive operation. That is why **Web Workers** come into play.

### **Web Worker**

Web worker is separate thread that is running seperately from our  browser main thread. We can comunicate with this thread using events and hand over heavy task to execute without making our UI unresponsive. We can create a Worker Object as bellow

```js
const worker = new Worker('path/to/worker.js', options);
```

We can write any javascript code inside the **worker.js** file. But there are some limitations accessing DOM element inside the Worker, also we can't use all the available feature in **window** object. But feature like [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), Web [Sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) we can use without any issues. See [Functions and classes available to workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers) for more details.

Comunications happens using a events and messages between Worker and main thread. Both main thread and Worker can send data using **postMessage()** and respond to that using **onmessage** event handler. Always data will be copied without sharing.

**Web Worker Event Model**

![1]({{"/assets/pwa/worker-model.png"}})

**Note** - Worker is running on seperate Contex

code example

**main.js**

```js
const worker = new Worker('path/to/worker.js', options);

function sendDate(data) {
  worker.postMessage(data);
}

worker.onmessage = function(data) {
  // recived data from Worker
}

```

**Worker.js**

```js
self.onmessage = function(e) {
  // proccessed data as we want
  // do heavy tasks on this thread
  console.log(e.data);
  // send processed data to main thread
  self.postMessage(newData)
}
```

## Note

Since workers are resource intensive, better terminate it after the job completed. This can be done in our main.js file or inside the Worker.js file as bellow.

**main.js**

```js
worker.terminate()
```

**worker.js**

```js
self.close()
```

If you think this is usefull, give it like and share it.
