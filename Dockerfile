FROM kalilinux/kali-rolling

#/etc/init.d/sshd.start.sh
#/etc/sudoers

RUN apt update && apt install openssh-server openssh-client openssl sudo python3 curl netcat-traditional -y
RUN useradd kali -m -p $(echo kali | openssl passwd -1 -stdin) -g sudo
ADD ./sshd.start.sh /etc/init.d/sshd.start.sh
RUN chmod +x /etc/init.d/sshd.start.sh
CMD ["bash"]
