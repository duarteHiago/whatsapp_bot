require('dotenv').config({ path: '../../../.env' });
const { sendList } = require('../methods/sendList');

(async () => {
  try {
    const number = '5566984450236';
    const listData = {
      title: 'List Title',
      description: 'List description',
      buttonText: 'Click Here',
      footerText: 'footer list\nhttps://examplelink.com.br',
      sections: [
        {
          title: 'Row tilte 01',
          rows: [
            { title: 'Title row 01', description: 'Lorem Ipsum...', rowId: 'rowId 001' },
            { title: 'Title row 02', description: 'Lorem Ipsum...', rowId: 'rowId 002' }
          ]
        },
        {
          title: 'Row tilte 02',
          rows: [
            { title: 'Title row 01', description: 'Lorem Ipsum...', rowId: 'rowId 001' },
            { title: 'Title row 02', description: 'Lorem Ipsum...', rowId: 'rowId 002' }
          ]
        }
      ]
    };

    await sendList(number, listData);
    console.log('Lista enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar lista:', error.response?.data || error.message);
  }
})();
