# Etapa 1 - Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera a pasta dist
RUN npm run build

# Etapa 2 - Servidor Web
FROM nginx:alpine

# Remove os arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados pelo Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta do nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]