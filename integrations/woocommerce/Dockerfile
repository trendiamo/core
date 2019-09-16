FROM wordpress:latest

ENV WOOCOMMERCE_VERSION 3.7.0
ENV STOREFRONT_VERSION 2.5.3

RUN apt-get update
RUN apt-get install -y --no-install-recommends unzip wget

RUN wget https://downloads.wordpress.org/plugin/woocommerce.${WOOCOMMERCE_VERSION}.zip -O /tmp/temp.zip \
    && cd /usr/src/wordpress/wp-content/plugins \
    && unzip /tmp/temp.zip \
    && rm /tmp/temp.zip

# Download WordPress CLI
RUN curl -L "https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar" > /usr/bin/wp && \
    chmod +x /usr/bin/wp

# Download Storefront theme
RUN wget https://downloads.wordpress.org/theme/storefront.${STOREFRONT_VERSION}.zip -O /tmp/storefront.zip \
    && cd /usr/src/wordpress/wp-content/themes \
    && unzip /tmp/storefront.zip \
    && rm /tmp/storefront.zip
