const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/forum_db';
const helmet = require('helmet');
const routes = require('./routes/api/index');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');


const app = express();
const { environment } = require('./config');
const isProduction = environment === 'production';
const PORT = 8080;

app.use(cors());

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cookieParser());
app.use(express.json());

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

  // Process sequelize errors
// app.use((err, _req, _res, next) => {
//     // check if error is a Sequelize error:
//     if (err instanceof ValidationError) {
//       let errors = {};
//       for (let error of err.errors) {
//         errors[error.path] = error.message;
//       }
//       err.title = 'Validation error';
//       err.errors = errors;
//     }
//     next(err);
//   });

  // Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
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
