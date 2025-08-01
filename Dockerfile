FROM nodesource/nsolid:latest

ARG NSOLID_SAAS
ENV NSOLID_SAAS=${NSOLID_SAAS}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
