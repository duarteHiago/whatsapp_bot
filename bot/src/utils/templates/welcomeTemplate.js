// bot/src/utils/templates/welcomeTemplate.js
module.exports = {
  type: "list",
  payload: {
    title: "TITULO ALTERADO", // título da lista
    description: "Olá! 👋 Eu sou o Bot da [Sua Empresa]. Selecione uma ação para continuar:", // descrição
    buttonText: "Escolha uma opção", // texto do botão
    footerText: "Footer da lista\nhttps://examplelink.com.br", // footer
    sections: [
      {
        title: "Menu Inicial",
        rows: [
          { title: "Ajuda", description: "Obtenha ajuda", rowId: "help" },
          { title: "Ver opções", description: "Confira as opções disponíveis", rowId: "menu" },
          { title: "Falar com atendente", description: "Converse com um humano", rowId: "human" }
        ]
      }
    ]
  }
};
