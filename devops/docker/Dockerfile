FROM node:16-alpine
RUN mkdir -p /app/src
WORKDIR /app/src
COPY /dist/ .
COPY /package.json .
COPY /package-lock.json .
RUN npm ci
EXPOSE 8080
CMD ["npm", "start"]