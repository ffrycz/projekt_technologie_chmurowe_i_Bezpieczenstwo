FROM python:3.13-slim

# Ustaw katalog roboczy
WORKDIR /app

# Zainstaluj potrzebne biblioteki systemowe
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Skopiuj aplikację do kontenera
COPY ./app .

# Zainstaluj zależności Pythona
RUN pip install --no-cache-dir -r requirements.txt

# Otwórz port
EXPOSE 5000

# Uruchom aplikację
CMD ["python", "api.py"]
