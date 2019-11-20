FROM node:12-alpine

ENV NODE_ENV production

RUN mkdir -p /usr/src/fifteen
WORKDIR /usr/src/fifteen

COPY . /usr/src/fifteen/

RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm", "start"]
