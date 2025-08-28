// services/messageService.js
const sendMessage = require('../methods/sendMessage');
const sendImage = require('../methods/sendImage');
const sendAudio = require('../methods/sendAudio');
const sendDocument = require('../methods/sendDocument');
const sendList = require('../methods/sendList');

exports.sendText = (number, text) => sendMessage(number, text);
exports.sendImage = (number, url, caption) => sendImage(number, url, caption);
exports.sendAudio = (number, url) => sendAudio(number, url);
exports.sendDocument = (number, url, filename) => sendDocument(number, url, filename);
exports.sendList = (number, listMessage) => sendList(number, listMessage);
