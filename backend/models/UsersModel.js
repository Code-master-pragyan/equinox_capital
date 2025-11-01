const {model} = require('mongoose');

const  usersSchema  = require('../schemas/UsersSchema');

const UserssModel = new model('User', usersSchema);

module.exports = UserssModel;