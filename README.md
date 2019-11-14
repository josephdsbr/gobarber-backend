<h1 align="center">Welcome to Go Barber - Backend  👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>


# How to run

## Setup Environment

You will need 3 databases running:

* Postgres.
* Redis
* MongoDB

**If you have docker**, then run the following commands:

* Postgres: ``docker run --name dbname -e POSTGRES_PASSWORD=dbpass -p 5432:5432 -d postgres:version``
* Redis: ``docker run --name dbname -p 6379:6379 -d -t redis:alpine``
* MongoDB: ``docker run --name dbname -p 27017 -d -t mongo``


## Install the application

1. Clone the repository in your local machine.
  ``git clone https://github.com/josephdsbr/gobarber-backend.git``.
2. Install dependecies.
  ``yarn``, ``yarn install`` ,``npm i`` or ``npm install``.
3. Setup environment variables:
  Copy the .env.example file, rename it to .env and set the environment variable as needed.

* Mailing system was tested using [mailtrap.io](https://mailtrap.io/). We also recommend you to use it too.

4. Create database and run migrations:
  ``yarn sequelize db:create`` then ```yarn sequelize db:migrate``

5. Start server in development mode:
  ``yarn dev`` or ``yarn dev:debug`` for debugging.

7. Start Queue Mailing System
  ``yarn queue``

## Author

👤 **José Vinícius Santos de Melo**

* Website: https://www.linkedin.com/in/josephdsbr/
* Github: [@josephdsbr](https://github.com/josephdsbr)

## Show your support

Give a ⭐️ if this project helped you!
