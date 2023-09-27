# Flatscatcher

This is an application for searching flats in Berlin. It provides list of actual flats, map, profile and preferences setup.
When you changing some data - stored procedures run at database and update a bunch of tables.

It contains _server_ side, _client_ side and _database_.

## Frontend

Frontend built on _react native_ framework. To run it install dependencies from `/client` folder by running `npm i` command.
Then run `npm start` to start the app.

It's easy to see application in mobile app emulator - you will need to install _android studio_ with android phone simulator and/or _xcode_ with iphone simulator.

> [!NOTE]
> I would recommend you also have _Emulator_ extension installed in your VSCode.

Take a look inside `apiService.js` file to locate backend api URL - when you will run it in emulator this must be the value of a _gateway_ of your virtual network.

## Backend

Backend built on _koa server_

Backend located inside _/server_ folder. To install dependencies run `npm i` command from it and then `nodemon index.js` to run your database.
Take a look at `controllers/index.js` file to find settings for your database connection.

## Database

Database is provided in file `flatscatcher.sql` - this is a simple postgres dump file which can be restored to your database.
It contains _schema_ with needed _tables_, stored _functions_ to run this app.

## Tips and flow

> [!NOTE]
> Inside code I've made some comments `TECH DEBT` - for functional to be improved.

Another comments in code for your comfort.

In beginning database contains lack of data - there is a `/server/service/getCoordinates.js` file to be runned separately to get and store coordinates 
for apartment list provided - for now only for preferred apartments.



