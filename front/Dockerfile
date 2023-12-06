# Use a imagem base do Node.js
FROM node:16

# Crie o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package.json package.json



# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Exponha a porta que a API está utilizando (substitua pela porta real)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm","run" ,"start"]
