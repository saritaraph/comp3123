const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/users');


// Add User Router
app.use(express.json());

app.use('/api/v1/user', userRouter);

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
//router.get('/home', (req,res) => {
  //res.send('This is home router');
//});
app.get('/home', (req, res, next) => {   
   res.sendFile(path.join(__dirname, 'home.html'), (err) => {
     if (err) next(err);
   });
 });

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const PORT = process.env.port || process.env.PORT || 8081;   
  app.listen(PORT, () => {
    console.log('Web Server is listening at port ' + PORT);
   });