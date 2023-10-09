const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/forum_db';

var testRoutes = require('./routes/testAPI');
var userRoutes = require('./routes/usersRoute');
var threadRoutes = require('./routes/threadsRoute');
var topicRoutes = require('./routes/topicRoute');

const app = express();
const PORT = 8080;
app.use(cors());

app.use('/thread', threadRoutes);
app.use('/testAPI', testRoutes);
app.use('/', userRoutes);
app.use('/topic', topicRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});



async function connectToDB() {
  try {
    const server = await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
}
connectToDB();

module.exports = app;