### About
This is a native mobile application that gives the top music chart artists, tracks and a facility for finding lyrics using the official **Musixmatch API**. The technology stack that has been used to build the application is/are:<br/>
1. **React Native (https://reactnative.dev/)**<br/>
2. **GraphQL (https://graphql.org/)**<br/>
3. **Apollo (https://www.apollographql.com/docs/react/integrations/react-native/)**<br/>
4. **ExpressJS (https://expressjs.com/)**<br/>
5. **NodeJS (https://nodejs.org/en/)**<br/>
6. **React Native Paper (https://reactnativepaper.com/)**<br/>
7. **Heroku (https://www.heroku.com/)**<br/>

### Data source
**Please note:** You are encouraged to generate your own API from the official site<br/>
The data has been sourced using the **Musixmatch API (https://developer.musixmatch.com/documentation)**

### Rules for contribution
**Please note:** The site is open to contributions. You are requested to keep the following pointers in your mind while working:
1. The contributor should not deviate from the core idea of the site
2. Follow **BEM (http://getbem.com/)** naming conventions for the CSS classes

### To get started:<br/>
**To install the server (inside lyrix-server):**<br/>
1. `npm install`: This installs npm modules for the server<br/>
2. `npm run server`: Starts the server<br/>

**To install the client (inside lyrix folder):**<br/>
1. `npm install`: This installs npm modules for the client<br/>
2. `npm start`: Runs the local server on your system<br/>
3. `npx react-native run-android` or `npx react-native run-ios`: Creates a test application on your device or emulator<br/> 

**To connect to Musixmatch API:**
1. Get your API key by signing up at the Musixmatch developers' site