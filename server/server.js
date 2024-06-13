const express = require('express');
const app = express();
const multer = require('multer');
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

// Route Includes
const userRouter = require('./routes/user.router');
const treesRouter = require('./routes/myTrees.router');
const statusesRouter = require('./routes/status.router');
const tree_activityRouter = require('./routes/tree_activity.router');
const uploadRouter = require('./routes/upload.router')(upload);

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/trees', treesRouter);
app.use('/api/statuses', statusesRouter);
app.use('/api/tree_activity', tree_activityRouter);
app.use('/api/upload', uploadRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
