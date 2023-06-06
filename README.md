# docker compose next with express example repository

The project so far is a monorepo consisting of two different Node applications: /client which is a Next JS application, and /server which is a Node and Express application. Both applications use Typescript.

## Setup

### Set node version

We use nvm to manage multiple node versions and easily switch between them.
(See [nvm on Github](https://github.com/nvm-sh/nvm) or [nvm-window on Github](https://github.com/coreybutler/nvm-windows) if you are using Windows). If you install nvm then project contains an .nvmrc file to ensure we are all using the same version of node with the project. It will pull down the node version specified in .nvmrc during the setup process.

## Docker based environment with no other dependencies

### First time setup and run
1. Install Docker Desktop for Mac or Docker for Windows: [see instructions](https://docs.docker.com/desktop/install/mac-install/)
2. cd into the root folder of the repository
3. Ask one of the engineers for an up to date .env file and put it in `./server`
4. Ask one of the engineers for an up to date .env.local file and put it in `./client.` 
4. Start the application in development mode by running `docker-compose -f docker-compose.dev.yml up --build`
5. Alternatively start the application in production mode by running `docker-compose up --build`

### Subsequent run
Simply run `docker-compose up`

Now the parts of the application can be accessed as follows:

- client: https://localhost:8080
- server: http://localhost:3000

In dev mode the applications will all automatically recompile if you make any changes as the local file systems are mounted inside the docker containers.

### Running the applications independently

Alternatively you may run both applications in dev mode independently by changing directory into each folder (/client and /server) and running the following in each folder:
1. `npm install`
2. `npm run dev`

## Storybook

Storybook is a framework which enables you to develop your components in an independent, isolated environment before integrating them into the client application. To run storybook run the following commands:
1. `cd client`
2. `npm install`
3. `npm run storybook`

You may now access storybook on http://localhost:6006


