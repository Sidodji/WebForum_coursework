const CreateTopicService = require('../services/topic/createTopicService')
const GetTopicsService = require('../services/topic/getTopicsService');
const GetTopicByNameService = require('../services/topic/getTopicByNameService');
const EditTopicByIdService = require('../services/topic/editTopicByIdService');
const DeleteTopicByNameService = require('../services/topic/deleteTopicByNameService');

exports.createTopic = (req,res) => CreateTopicService(req, res);
exports.getTopics = (req, res) => GetTopicsService(req, res);
exports.getTopicByName = (req, res) => GetTopicByNameService(req, res);
exports.editTopicById = (req, res) => EditTopicByIdService(req, res);
exports.deleteTopicByName = (req, res) => DeleteTopicByNameService(req, res);
