const router = require('express').Router();
const db = require("./model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res) => {
  try{
    const { username, password } = req.body

    const newUser = await db.adduser({
      username,
      password: await bcrypt.hash(password, 15),
    })

    res.status(201).json(newUser)

  } catch(err) {
    console.log(err)
    res.status(500).json({
    message: "Something went wrong"
    })
  }
});

router.post('/login', async (req, res) => {
  try{
    const { username, password } = req.body
    const user = await db.findByUsername(username)

  
    if(!user) {
        return res.status(401).json({ message: "You shall not pass!"})
    }

    
    const passwordValid = await bcrypt.compare(password, user.password)

    
    if(!passwordValid) {
        return res.status(401).json({ message: "You shall not pass!"})
    }

    const payload = {
        userId: user.id,
        username: user.username,
    }

    
    res.json({
        message: `Welcome ${user.username}!`,
        token: jwt.sign(payload, "keep is secret") 
    })

} catch(err) {
  console.log(err)
  res.status(500).json({
  message: "Something went wrong"
  })
}
});

module.exports = router;