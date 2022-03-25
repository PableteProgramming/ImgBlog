FROM node

COPY public /var/www/node/ImgBlog/public
COPY routes /var/www/node/ImgBlog/routes
COPY views /var/www/node/ImgBlog/views
COPY package.json /var/www/node/ImgBlog/
COPY server.js /var/www/node/ImgBlog/

RUN apt update && apt install php php-cgi sudo -y
#RUN useradd blogger -m -p $(echo impossiblePasswd$1234 | openssl passwd -1 -stdin) -g sudo

WORKDIR /var/www/node/ImgBlog

RUN npm install

EXPOSE 3000

#USER www-data

ENTRYPOINT [ "npm", "start" ]


