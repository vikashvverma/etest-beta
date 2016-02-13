# etest-beta
This is the beta version (backend api) of etest in NodeJS(https://twitter-apis.herokuapp.com).
The current live version is at http://etest.programminggeek.in/
#Running the example
In order to run the example you need to have npm and nodejs installed.

Run `npm install` to ensure local dependencies are available.

You also need to set the ClientSecret and ClientId for your Auth0 app as enviroment variables with the following names respectively: `AUTH0_CLIENT_SECRET` and `AUTH0_CLIENT_ID`.

For that, the following should have been already created for you; if not, just create a file named `.env` in the directory and set the values like the following, the app will just work:

````bash
# .env file
AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
MONGO_URI=yourAwesomeUri
````

Once you've set those 2 enviroment variables, just run `node server.js` and try calling [http://localhost:3001/ping](http://localhost:3001/ping)
