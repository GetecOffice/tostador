FROM python:3.10-slim

# Instalar las herramientas necesarias para compilar paquetes
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Resto de tu Dockerfile...
