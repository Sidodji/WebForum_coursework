const GetCommentsByPostIdService = require('../services/comment/getCommentsByPostIdService');
const CreateCommentService = require('../services/comment/createCommentService');
const GetCommentByCommentIdService = require('../services/comment/getCommentByCommentIdService');
const EditCommentByCommentIdService = require('../services/comment/editCommentByCommentIdService');
const DeleteCommentByCommentIdService = require('../services/comment/deleteCommentByCommentIdService');

exports.getCommentsByPostId = (req, res) => GetCommentsByPostIdService(req,res);
exports.createComment = (req, res) => CreateCommentService(req, res);
exports.getCommentByCommentId = (req, res) => GetCommentByCommentIdService(req, res);
exports.editCommentByCommentId = (req, res) => EditCommentByCommentIdService(req, res);
exports.deleteCommentByCommentId = (req, res) => DeleteCommentByCommentIdService(req, res);
