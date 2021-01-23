const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const usersRoutes = require('./routes/users');
const papersRoutes = require('./routes/papers');
const collegesRoutes = require('./routes/colleges');

const app = express();

// =============================Database Connectivity=========================================


// Connect to local mongo db
mongoose.connect(process.env.LOCAL_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


// Connect to ATLAS
// const REMOTE_URL = 'mongodb+srv://shoaib:' + process.env.PRIME_MANAGER_ATLAS_KEY + '@myfreecluster.uqauj.mongodb.net/researchaide?retryWrites=true&w=majority';
// mongoose.connect(REMOTE_URL, { useNewUrlParser: true, useUnifiedTopology: true });


// ===========================================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/uploads', express.static(path.join('backend/uploads')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'x-www-form-urlencodedOrigin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, UPDATE, DELETE, OPTIONS');
  next();
})

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/papers', papersRoutes);
app.use('/api/v1/colleges', collegesRoutes);

module.exports = app;
