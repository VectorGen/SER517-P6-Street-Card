FROM node:lts
WORKDIR /src/frontend
COPY package.json /src/frontend
RUN npm install
COPY . /src/frontend
EXPOSE 3000
CMD ["npm", "start"]