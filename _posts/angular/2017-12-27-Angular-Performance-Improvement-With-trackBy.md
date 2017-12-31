---
layout: post
title:  "Angular Perfomance Improvement with trackBy Function"
date:   2017-12-27 08:44:39
categories: angular.js
---


### **Angular Performace Improvement with trackBy Function**


When we interate over collections in angular 2,4 or lates version with **ngFor** directive that will add the template once per item into DOM.

example code
``` html
    <list>
        <item  *ngFor="let item of items">
            {{item.id}}
        </item>
    </list>
```

When we change the data in the collection (**Keep it mind that changes in collection means new reference. Not the same Object reference.**), angular does not have an idea about what items are added, removed or updated in the collections. In this case angular remove the all items in the DOM releted to this collection and add again to DOM. 

It means lot of DOM manipulations. When the size of the collection is grow these DOM manipulations are become more expencive.This cause a performace problem in the application.


#### **trackBy Function as a Solution**

we can solve this problem with angular tackBy funcrtion. This tackBy function can track the data in collection for any updates. Angular 2 and 4 have diffrent syntax for trackBy function. The tackBy function take two arguments, first one is **index** of the item in collection and second one is **T**(each element in the collection).

#### **Angular 2 syntax**

**ListComponent.html**
``` html
    <list>
        <item  *ngFor="let item of items;trackBy: trackByFn">
            {{item.id}}
        </item>
    </list>
```

**ListComponent.ts**
``` typescript
    // ...
    public trackByFn(index: number, item: T): any {
        return item.id; // or index;
    }
```

#### **Angular 4 and above**

**ListComponent.html**
``` html
    <list>
        <item  *ngFor="let item of items;trackByFunction: trackByFn">
            {{item.id}}
        </item>
    </list>
```

**Component function is same. trackBy function has been depricated in angular version 4 to trackByFunction**.

Now angular will only manipulate the DOM elements related to updated or new items in the collection. Angular can track updated or new items with unique id we given with trackBy function.

 I think this will help impove the performace in yout application as well. 

 Thank.