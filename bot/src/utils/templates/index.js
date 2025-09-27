const greeting = require("./greetingTemplate");
const help = require("./helpTemplate");
const menu = require("./menuTemplate");
const welcome = require("./welcomeTemplate");

module.exports = {
  greeting,
  help,
  menu,
  welcome,
  default: { type: "text", text: "Desculpe, não entendi sua mensagem 🤔" }
};
