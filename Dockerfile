FROM node:lts-alpine AS node

ARG APP_REVISION
ENV APP_API_PROXY_TARGET="http://0.0.0.0:3030"
ENV APP_API_TARGET="http://0.0.0.0:3030"
ENV APP_BASE_PATH="/universal-redux"
ENV APP_PORT=80
ENV APP_PUBLIC_PATH="/universal-redux/"
ENV APP_REVISION=$APP_REVISION
ENV BABEL_ENV="production"
ENV NODE_ENV="production"
ENV NODE_PATH="/app/src"
ENV UNIVERSAL_WEBPACK_CSS_LOADER_V4="true"

# Project
COPY ./ /app/
WORKDIR /app/

# Build dist
RUN BABEL_ENV="development" NODE_ENV="development" yarn install \
  && yarn build \
  && rm -Rf node_modules/ \
  && yarn install

CMD ["/usr/local/bin/yarn", "start"]
