const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const { connectToDatabase } = require('./database/database');

const { verifyAuth } = require('./authentication');

const loginRouter = require('./routers/login.router');
const signupRouter = require('./routers/signup.router');
const userRouter = require('./routers/user.router');

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());

connectToDatabase();

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Bubble API' });
});

app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.use(verifyAuth);
app.use('/user', userRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route does not exist!' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: 'Error occurred on server side!', errMessage: err.message });
});

app.listen(port, () => {
  console.log('Server ONLINE and running at PORT ' + port);
});
