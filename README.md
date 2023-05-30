# ai-experiment
ai chatbot

The project so far consists of two different Node applications ./client which is a Next JS application, and /server which is a Node and Express application. Both applications use Typescript.

## Setup

### Docker based environment with no other dependencies

## First time setup and run
1. Install Docker Desktop for Mac or Docker for Windows: [see instructions](https://docs.docker.com/desktop/install/mac-install/)
2. cd into the root folder of the repository
3. ask one of the engineers for an up to date .env file and put it in `./server`
4. start the application in development mode by running `docker-compose -f docker-compose.dev.yml up --build`
5. alternatively start the application in production mode by running `docker-compose up --build`

## Subsequent run
1. Simply run `docker-compose up`

Now the parts of the application can be accessed as follows:

- client: https://localhost:8080
- server: http://localhost:3000

In dev mode the applications will all automatically recompile if you make any changes as the local file systems are mounted inside the docker containers.

### Node version

We use nvm to manage multiple node versions and easily switch between them.
(See [nvm on Github](https://github.com/nvm-sh/nvm) or [nvm-window on Github](https://github.com/coreybutler/nvm-windows) if you are using Windows). Install nvm and then the project contains an .nvmrc file to ensure we are all using the same version of node with the project.