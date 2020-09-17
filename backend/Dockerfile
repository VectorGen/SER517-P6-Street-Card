FROM ubuntu:18.04
ENV PORT 8080
RUN apt-get update \
  && apt-get install -y python3-pip python3-dev libpq-dev \
  && apt-get install -y vim
WORKDIR /src/backend
#RUN sudo pip install virtualenv
#RUN virtualenv newenv
#RUN source newenv/bin/activate
COPY requirements.txt /src/backend
RUN pip3 install -r requirements.txt
CMD python3 manage.py makemigrations
CMD python3 manage.py migrate
COPY . /src/backend
EXPOSE 8080
CMD celery -A api worker -l info
CMD python3 manage.py runserver 0.0.0.0:$PORT
#ENTRYPOINT ["sh", "entrypoint.sh"]
#FROM python:3
#ENV PYTHONUNBUFFERED 1
#WORKDIR backend
#COPY requirements.txt /backend/
#RUN pip install -r ./backend/requirements.txt
#COPY . ./backend
