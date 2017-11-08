---
layout: post
title:  "Install Node.js"
date:   2017-10-12 11:53:39
categories: node.js
---


### **Install node.js on Mac.**

First, download the latest node.js version (current LTS version is v6.11.4) from  the official site [here](https://nodejs.org/en/download/). Always LTS version is recommended to use. Next, double click on the **.pkg** file and install. Now open the terminal and type **node -v**. You can see the output as follows.

{% highlight shell %}
    $ node -v
    // you can see result as
    v4.4.4
    // version can be change
{% endhighlight shell %}

Next, write a Hello World example using node.js to make sure it's working properly.

{% highlight shell %}
    $ node
    > console.log("hello nodejs");
    hello nodejs    // result will be like this
{% endhighlight shell %}

Or you can download binary file into folder and add the path to enviroment variable.

### **Install node.js on Linux**

In Linux you can install using apt-get or binary file. But the binary file is recommended because in Linux, packages are not install in one place. That is a disadvantage. So when you install something into Linux always try to install that using a binary file.

#### **Install using apt-get**

First, open a terminal and type following commands.
{% highlight shell %}
   $ sudo apt-get install nodejs
    // this will install the latest version available 
{% endhighlight shell %}
If you install successfully type this command.

{% highlight shell %}
    $ node -v
    // you can see result as
    v4.4.4
    // version can be change
{% endhighlight shell %}
Next, write a Hello World example using node.js to make sure it's working properly.

{% highlight shell %}
    $ node
    > console.log("hello nodejs");
    hello nodejs    // result will be like this
{% endhighlight shell %}

#### **Install using binary file**

Fitst, download the binary file from official site and put it some someware and extract it. In mycase folder is /home/ajantha/programmes/nodejs/nodejs-v6.11.4-linux-x64. Next, you should add the path. You can do this three ways. You can add the path to **.bashrc** file or **/etc/enviroment** file or **/etc/profile/**. I put it in /etc/profile file like bellow.

{% highlight shell %}
    $ export NODE_HOME=/home/ajantha/programmes/nodejs/node-v4.4.4-linux-x64
    $ export PATH=$NODE_HOME/bin:$PATH
{% endhighlight %}

After that, type following command or restart the computer.
{% highlight shell %}
    $ source  /etc//profile
    $ node -v
    // you can see result as
    v4.4.4
    // version can be change
{% endhighlight shell %}

Next, write the fitst example using node.js to make sure it's working properly.
{% highlight shell %}
    $ node
    > console.log("hello nodejs");
    hello nodejs    // result will be like this
{% endhighlight shell %}


### **Install node.js on Windows.**

First, download the latest node.js version (current LTS version is v6.11.4) from  the official site [here](https://nodejs.org/en/download/). Always LTS version is recommended to use. Next, double click on the **.msi** file and install. Now open the CMD and type **node -v**. You can see the output as follows.

{% highlight shell %}
    $ node -v
    // you can see result as
    v4.4.4
    // version can be change
{% endhighlight shell %}

Next, write a Hello World example using node.js to make sure it's working properly.

{% highlight shell %}
    $ node
    > console.log("hello nodejs");
    hello nodejs    // result will be like this
{% endhighlight shell %}

Or you can download binary file into folder and add the path to enviroment variable.

Look like you successfully complete the installation. Thank you.
