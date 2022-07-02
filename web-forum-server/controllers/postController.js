const GetPostsByTopicIdService = require('../services/post/getPostsByTopicIdService');
const CreatePostForTopicIdService = require('../services/post/createPostForTopicIdService');
const GetPostByPostIdService = require('../services/post/getPostByPostIdService');
const EditPostByPostIdService = require('../services/post/editPostByPostIdService');
const DeletePostByPostIdService = require('../services/post/deletePostByPostIdService');
const GetPostsByUserIdService = require('../services/post/getPostsByUserIdService');

exports.getPostsByTopicId = (req, res) => GetPostsByTopicIdService(req, res);
exports.createPostForTopicId = (req, res) => CreatePostForTopicIdService(req, res);
exports.getPostByPostId = (req, res) => GetPostByPostIdService(req, res);
exports.editPostByPostId = (req, res) => EditPostByPostIdService(req, res);
exports.deletePostByPostId = (req, res) => DeletePostByPostIdService(req, res);
exports.getPostsByUserId = (req, res) => GetPostsByUserIdService(req, res);
