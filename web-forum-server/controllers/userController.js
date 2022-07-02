const GetUsersService = require('../services/user/getUsersService');
const GetUserByIdService = require('../services/user/getUserByIdService');
const EditUserByIdService = require('../services/user/editUserByIdService');
const DeleteUserByIdService = require('../services/user/deleteUserByIdService');

exports.getUsers = (req, res) => GetUsersService(req, res);
exports.getUserById = (req, res) => GetUserByIdService(req, res);
exports.editUserById = (req, res) => EditUserByIdService(req, res);
exports.deleteUserById = (req, res) => DeleteUserByIdService(req, res);
