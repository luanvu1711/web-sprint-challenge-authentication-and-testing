/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")


module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization

      if (!token) {
          return res.status(401).json({ message: "You shall not pass!"})
      }


      jwt.verify(token, "keep is secret", (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: "You shall not pass!"})
          }

          next()
      })
  } catch(err) {
      console.log(err)
      res.status(401).json({ you: 'shall not pass!' });
  }
};