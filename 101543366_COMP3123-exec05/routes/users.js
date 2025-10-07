//const routerUser = express.Router();

const express = require('express');                    
const fs = require('fs');                               
const path = require('path');                           
const routerUser = express.Router();

/*
- Return all details from user.json file to client as JSON format
*/
const userFilePath = path.join(__dirname, '..', 'user.json'); 
routerUser.get('/profile', (req, res, next) => {              
  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) return next(err);
    try {
      const user = JSON.parse(data);
      res.json(user);                                         
    } catch (e) {
      next(e);
    }
  });
});



/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
routerUser.post('/login', (req, res, next) => {               
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ status: false, message: 'Username and password are required' });
  }
  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) return next(err);
    try {
      const user = JSON.parse(data);
      if (user.username !== username) {
        return res.json({ status: false, message: 'User Name is invalid' });
      }
      if (user.password !== password) {
        return res.json({ status: false, message: 'Password is invalid' });
      }
      return res.json({ status: true, message: 'User Is valid' });
    } catch (e) {
      next(e);
    }
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
routerUser.get('/logout/:username', (req, res) => {         
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;