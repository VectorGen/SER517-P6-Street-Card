FROM python:latest
WORKDIR /src/backend
COPY requirements.txt /src/backend
RUN pip3 install -r requirements.txt
COPY . /src/backend
EXPOSE 8000
ENTRYPOINT ["sh", "entrypoint.sh"]
