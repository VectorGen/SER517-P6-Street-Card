FROM python:latest
WORKDIR /src/backend
COPY . ./
RUN pip3 install -r requirements.txt
EXPOSE 8000
ENTRYPOINT ["sh", "entrypoint.sh"]
