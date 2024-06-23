const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');
const taskRoutes = require('./tasks');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Todo API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;