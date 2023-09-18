FROM node:18-alpine
WORKDIR /navigator/
COPY public/ /navigator/public
COPY src/ /navigator/src
COPY package.json /navigator/
RUN npm install --force
CMD ["npm", "start"]