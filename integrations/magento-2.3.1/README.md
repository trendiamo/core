# README

## Requirements

- Docker, Docker-compose https://www.docker.com/get-started

## Setup

```sh
echo "127.0.0.1 magento2.test" | sudo tee -a /etc/hosts
```

```sh
docker-compose up -d
./magento-setup
open http://magento2.test
```

## Run locally:

```sh
docker-compose up -d
```

## Magento store:

Magento store at: http://magento2.test
Magent store admin at: http://magento2.test/admin
