import { useState } from 'react';
import { sendMessage } from '../../api/messageApi';

export default function MessageForm() {
  const [number, setNumber] = useState('');
  const [type, setType] = useState('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [filename, setFilename] = useState('');
  const [listMessage, setListMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { number, type };
    if (type === 'text') payload.text = text;
    if (type === 'image') { payload.url = url; payload.caption = caption; }
    if (type === 'audio') payload.url = url;
    if (type === 'document') { payload.url = url; payload.filename = filename; }
    if (type === 'list') payload.listMessage = listMessage;

    try {
      const res = await sendMessage(payload);
      alert(res.message);
    } catch (err) {
      alert('Erro ao enviar mensagem');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Número" value={number} onChange={e => setNumber(e.target.value)} />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="text">Texto</option>
        <option value="image">Imagem</option>
        <option value="audio">Áudio</option>
        <option value="document">Documento</option>
        <option value="list">Lista</option>
      </select>

      {type === 'text' && <input type="text" placeholder="Texto" value={text} onChange={e => setText(e.target.value)} />}
      {type === 'image' && (
        <>
          <input type="text" placeholder="URL da imagem" value={url} onChange={e => setUrl(e.target.value)} />
          <input type="text" placeholder="Legenda" value={caption} onChange={e => setCaption(e.target.value)} />
        </>
      )}
      {type === 'audio' && <input type="text" placeholder="URL do áudio" value={url} onChange={e => setUrl(e.target.value)} />}
      {type === 'document' && (
        <>
          <input type="text" placeholder="URL do documento" value={url} onChange={e => setUrl(e.target.value)} />
          <input type="text" placeholder="Nome do arquivo" value={filename} onChange={e => setFilename(e.target.value)} />
        </>
      )}
      {type === 'list' && <textarea placeholder="Mensagem de lista" value={listMessage} onChange={e => setListMessage(e.target.value)} />}

      <button type="submit">Enviar</button>
    </form>
  );
}
