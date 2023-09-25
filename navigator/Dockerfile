FROM node:18-alpine
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
ENV REACT_APP_GOOGLE_API_KEY="AIzaSyD_jBYKIilrDpKYvAf1LAeBLoSC2ciauAI"
COPY . .
RUN npm install -g serve
RUN npm install --force
RUN npm run build
EXPOSE 8080
CMD ["serve", "-s", "-l", "8080", "./build"]