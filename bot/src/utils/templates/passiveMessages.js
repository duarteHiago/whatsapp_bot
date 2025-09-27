module.exports = {
    welcomeList: {
        title: 'Bem-vindo ao nosso atendimento!',
        description: 'Escolha uma opção abaixo para continuar:',
        buttonText: 'Ver opções',
        footerText: 'https://examplelink.com.br',
        sections: [
            {
                title: 'Produtos',
                rows: [
                    { title: 'Produto 01', description: 'Descrição do produto 01', rowId: 'prod_01' },
                    { title: 'Produto 02', description: 'Descrição do produto 02', rowId: 'prod_02' }
                ]
            },
            {
                title: 'Suporte',
                rows: [
                    { title: 'Fale com suporte', description: 'Entrar em contato com o suporte', rowId: 'support' },
                    { title: 'Preços', description: 'Tabela de preços', rowId: 'prices' }
                ]
            }
        ]
    }
};
