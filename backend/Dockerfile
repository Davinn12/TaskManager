# ─────────────────────────────────────────────────────────────
#  TaskManager Backend — PHP 8.2 + Apache + Slim Framework 4
# ─────────────────────────────────────────────────────────────
FROM php:8.2-apache

# Extensiones PHP necesarias + unzip para Composer
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-install mysqli pdo pdo_mysql && \
    a2enmod rewrite

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar manifiestos e instalar dependencias primero (aprovecha caché)
COPY composer.json ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copiar el resto del código
COPY . .

# Apuntar Apache al directorio público
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80
