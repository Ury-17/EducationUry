FROM node:12-buster

ENV PORT 8080

EXPOSE 8080

WORKDIR /app

LABEL maintainer="roof.is.on.fire.science@gmail.com"

COPY HistoryHub.Web .
RUN npm install

RUN npm run build

CMD ["node", "./dist"]