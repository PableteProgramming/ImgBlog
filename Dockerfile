FROM node

RUN apt update && apt install php php-cgi sudo python -y
RUN useradd blogger -m -p $(echo impossiblePasswd$1234 | openssl passwd -1 -stdin)

USER blogger


COPY public /var/www/node/ImgBlog/public
COPY routes /var/www/node/ImgBlog/routes
COPY views /var/www/node/ImgBlog/views
COPY package.json /var/www/node/ImgBlog/
COPY server.js /var/www/node/ImgBlog/
COPY vuln.py /home/blogger/

USER root
RUN chown -R blogger /var/www/node/ImgBlog/

USER blogger

WORKDIR /var/www/node/ImgBlog

RUN npm install

EXPOSE 3000

USER root
RUN chown -R blogger /var/www/node/ImgBlog/*
RUN echo "blogger ALL=(ALL) NOPASSWD:/usr/bin/python /home/blogger/vuln.py" > /etc/sudoers.d/custom

USER blogger
ENTRYPOINT [ "npm", "start" ]