Dcycle Node.js starterkit
=====

[![CircleCI](https://circleci.com/gh/dcycle/starterkit-node/tree/master.svg?style=svg)](https://circleci.com/gh/dcycle/starterkit-node/tree/master)

About
-----

This project is a quick starter for Node applications on Docker. We have implemented a very simple chat application with authentication (see "Resources", below) using Socket.io, Express, and MongoDB.

Strategies, credentials, and accounts
-----

This project uses [Passport](https://www.passportjs.org/) for authentication along with the "Username/password" strategy.

You can create a new account or regenerate a random password for an existing account by typing, on the command line:

    ./scripts/reset-password.sh some-username

Quickstart
-----

Install Docker and run:

    ./scripts/deploy.sh

This will give you a URL, username and password.

Now log on using the the credentials provided.

You will be able to use a simple chat application, and log out.

Creating new users
-----

You can run:

    ./scripts/reset-password.sh some-new-user

How to change the color of the gif monsters
-----

Gif monsters can be several colors. The original is black and is in ./app/static/images/monster_black.gif.

Non-black colors (in this example red) can be generated like this:

        docker run -v $(pwd):/imgs --rm dpokidov/imagemagick /imgs/monster_black.gif -fill "#ff0000" -opaque "#000000" /imgs/monster_red.gif

How to make monsters blink at different times
-----

We have used [GIF Start Frame Offsetter](https://github.com/dcycle/gif-start-frame-offsetter/blob/master/README.md) to create variants of our monster gifs so that they have different cycles.

It is planned to use a script to put a use a random variant for each occurrence, making it look like they are not blinking in unison.

Resources
-----

* [How to build a real time chat application in Node.js using Express, Mongoose and Socket.io, July 30, 2018, Free Code Camp](https://www.freecodecamp.org/news/simple-chat-application-in-node-js-using-express-mongoose-and-socket-io-ee62d94f5804/).
* [Local Authentication Using Passport in Node.js, Beardscript, April 8, 2020, Sitepoint](https://www.sitepoint.com/local-authentication-using-passport-node-js/).
