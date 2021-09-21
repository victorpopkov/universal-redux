FROM node:14.17.6-alpine3.12 AS node

ARG APP_REVISION
ENV APP_REVISION="${APP_REVISION}"

ENV BABEL_ENV="production"
ENV NODE_ENV="production"

COPY ./ /app/
WORKDIR /app/

RUN yarn install

CMD ["/usr/local/bin/yarn", "start"]
