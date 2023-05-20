FROM node:18 as builder
WORKDIR /frontend

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i
COPY . ./
RUN npm run build


FROM node:18 as runner
WORKDIR /frontend

ENTRYPOINT [ "npm", "start" ]
EXPOSE 4000


