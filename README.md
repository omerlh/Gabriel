[![Build Status](https://travis-ci.org/omerlh/Gabriel.svg?branch=master)](https://travis-ci.org/omerlh/Gabriel)
# Gabriel
Simplify dependency management by creating RSS feed from all the dependencies of your project.
Each time a new version published to one of your dependencies, the feed will be updated.
Currently only NPM supported.

#Local development
Run once `docker build -t gabriel .`, and then simply `docker-compose up --build`.
Than code and test will reload whenever the code changed.
