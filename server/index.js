const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const database = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });


const Server = mongoose.model('Server', {
  serverID: Number,
});

const User = mongoose.model('User', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  name: String,
  descrim: Number,
  warnings: Number,
  isAdmin: Boolean
});

const Configuration = mongoose.model('Configuration', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  prefix: String,
  adminRole: Number
});
const Channel = mongoose.model('Channel', {
  channelId: String,
});
const Support = mongoose.model('Support', {
  user: String,
  userid: String,
  problem: String,
  date: {type: Date, default: Date.now},
  resolved: Boolean,
  dateResolved: {type: Date, default: null}
});
module.exports = {
  Server, User, Configuration, Channel, Support, database 
};