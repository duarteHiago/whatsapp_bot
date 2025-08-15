const menus = require('../data/menus.json');
const responses = require('../data/responses.json');
const whatsappService = require('./whatsapp.service');
const logger = require('../utils/logger');

class MenuService {
  constructor() {
    this.userStates = new Map(); // Em produção, use Redis ou banco
  }

  async handleUserMessage(from, message, buttonId = null) {
    try {
      if (buttonId) {
        return await this.handleButtonPress(from, buttonId);
      }

      // Primeira interação ou comando reset
      if (message.toLowerCase().includes('menu') || !this.userStates.has(from)) {
        return await this.sendMenu(from, 'main');
      }

      // Resposta livre do usuário
      return await this.handleFreeText(from, message);
      
    } catch (error) {
      logger.error(`Erro ao processar mensagem de ${from}:`, error);
      return await whatsappService.sendTextMessage(
        from, 
        'Desculpe, ocorreu um erro. Digite "menu" para recomeçar.'
      );
    }
  }

  async handleButtonPress(from, buttonId) {
    logger.info(`Botão pressionado por ${from}: ${buttonId}`);

    // Voltar ao menu principal
    if (buttonId.startsWith('voltar_')) {
      const targetMenu = buttonId.replace('voltar_', '');
      return await this.sendMenu(from, targetMenu);
    }

    // Verificar se é um submenu
    if (menus[buttonId]) {
      return await this.sendMenu(from, buttonId);
    }

    // Verificar se é uma resposta final
    if (responses[buttonId]) {
      const response = responses[buttonId];
      
      await whatsappService.sendTextMessage(from, response.message);
      
      // Depois de 3 segundos, mostrar menu principal novamente
      setTimeout(async () => {
        await this.sendMenu(from, 'main');
      }, 3000);
      
      return;
    }

    // Botão não encontrado
    return await whatsappService.sendTextMessage(
      from, 
      'Opção não encontrada. Vou mostrar o menu principal:'
    ).then(() => this.sendMenu(from, 'main'));
  }

  async sendMenu(from, menuId) {
    if (!menus[menuId]) {
      logger.error(`Menu não encontrado: ${menuId}`);
      menuId = 'main';
    }

    const menuData = menus[menuId];
    this.userStates.set(from, menuId);
    
    return await whatsappService.sendInteractiveMenu(from, menuData);
  }

  async handleFreeText(from, message) {
    return await whatsappService.sendTextMessage(
      from,
      `Recebi sua mensagem: "${message}"\n\nPara melhor atendê-lo, use nosso menu:`
    ).then(() => this.sendMenu(from, 'main'));
  }
}

module.exports = new MenuService();