# ------------------------
# 1. Imagem base
# ------------------------
FROM node:18

# Diretório de trabalho
WORKDIR /app

# ------------------------
# 2. Instala dependências
# ------------------------

# Copia apenas package.json e package-lock.json para aproveitar cache do Docker
COPY package*.json ./

# Instala TODAS dependências (incluindo dev) se NODE_ENV=development
# Instala somente de produção se NODE_ENV=production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --only=production; fi

# ------------------------
# 3. Copia o restante do código
# ------------------------
COPY . .

# ------------------------
# 4. Configura porta e comando padrão
# ------------------------
EXPOSE 3000
CMD ["node", "src/server.js"]
