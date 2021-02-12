const mongoose = require('mongoose');

module.exports = mongoose.connect(
  process.env.DATABASE_URL ||
  'mongodb+srv://diegoAndrade777:qwe123@testlinkapidb.4fzr4.mongodb.net/testlinkapidb?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
