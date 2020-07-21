const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require("../jokes/jokes-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;



// Differences between using sessions or JSON Web Tokens for authentication.
// Sessions are stored in the server and on the client. 
// When a user navigates a website, everytime he/she clicks on a link to navigate to it the client will send a request to the server that contains the session ID. 
// If the ID matches the one on the server then the user is allowed to proceed to the requested page. 
// JSON web tokens are only stored on the client. The server only contains the secret that is in the JSON signature. 
// When the client sends a request to the server if the signature on the JSON web token matches the one on the server then the user is authenticated.

// What does bcrypt do to help us store passwords in a secure manner.
// Bcrypt hashes passwords for us so that they are stored as a hashed string instead of the original password that the user typed in. 
// It also allows us to add a time complexity so that we can increase the security of the hash.

// How are unit tests different from integration and end-to-end testing.
// Unit tests are tests that check small parts of our app. 
// Integration tests are tests that check how these small parts work together as a whole. 
// End to end testing tests a piece of software from start to finish as it will be used by the actual users.

// How Test Driven Development changes the way we write applications and tests.
// It changes the way we write applications because we write the test first and then we write code to pass the test. 
// Finally we refactor the code to make it cleaner and eliminate any redundancies.