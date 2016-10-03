# Minimal repo for Angular 2 Socket io bug.

### angular 2 cli placed in front-end folder  , server code in server.js and Socket io code in routes/sockets.js

## Preporation and Explanation of bug 
### Preporation
To run app just clone repo and run in repofolder npm install. Then npm start. And open http://localhost:3000

DO not forget to open few tabs in Google Chrome (example) , you will notice that in all tabs amount of user will increase (depends on amount of open tabs) without reload page.

### Bug 

If you will do the same as in Google Chrome with Safari you will  notice that tabs which you opened befor will not display new users but console.log('llll') is working.
To solve this bug need to force reload (rerender) with NgZone.



