const express = require('express')
const cors = require('cors');

var testRoutes = require('./routes/testAPI');
// var userRoutes = require('./routes/userAPI');
// var threadRoutes = require('./routes/threadRoute');

const app = express();
const PORT = 8080;
app.use(cors());

// app.use('/thread', threadRoutes);
app.use('/testAPI', testRoutes);
// app.use('/', userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});


var server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// async function connectToDB() {
//   try {
//     const server = await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   } catch (err) {
//     console.log(err.message);
//   }
// }
// connectToDB();

module.exports = app;