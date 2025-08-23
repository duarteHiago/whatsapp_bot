# Use Node 18 oficial
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Expõe a porta do servidor Node
EXPOSE 3000

# Comando para rodar o servidor
CMD ["node", "src/server.js"]
