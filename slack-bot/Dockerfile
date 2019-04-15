FROM ruby:2.4

RUN apt-get update
RUN apt-get -y install curl
RUN apt-get install -my gnupg
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get -qqyy install nodejs yarn && rm -rf /var/lib/apt/lists/*
RUN apt-get -qqyy install yarn

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install --jobs 5 --retry 5 --without development test
RUN mkdir /app
WORKDIR /app
COPY . /app
ENV RAILS_ENV production
ENV RACK_ENV production

CMD ["bin/run-dev.sh"]
