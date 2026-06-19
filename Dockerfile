FROM node:20.17.0-alpine

COPY ./ /srv/service
WORKDIR /srv/service

ENV TERM="xterm-256color"
ENV TMPDIR="./artifacts/tmp"

ENV FORCE_COLOR=1

ENV PORT=80

RUN npm install

RUN npm run build

CMD npm run start:prod
