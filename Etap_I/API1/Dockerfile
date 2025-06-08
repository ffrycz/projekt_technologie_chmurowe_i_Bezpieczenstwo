
FROM python:latest
WORKDIR /app
COPY ./app .
EXPOSE 5000
RUN pip install -r requirements.txt
CMD ["python", "api.py"]