# Twitter QueryBuilder Demo

An example project used to test out various web technologies.

[View demo](http://kyunghoon-demo-client.s3-website-ap-northeast-1.amazonaws.com/#/)

## Features

### Backend

- aws
- serverless framework
- graphql
- dynamodb
- docker

### Frontend

- react
- apollojs
- hot module reload
- webpack 2
- cssnext

### Linting

- eslint

### Testing / Coverage

- jest

## Directory Layout

~~~~
    ├── /front/                     # Frontend Projects
    │   ├── /twitterdemo/           # The twitter demo app
    │   │   ├── package.json        # Modules used by this particular app
    │   │   └── /...                # Additional app files
    │   ├── /graphiql/              # Interactive graphql app
    │   │   ├── package.json        # Modules used by this particular app
    │   │   └── /...                # Additional app files
    │   └── /...                    # Additional apps can be added here
    ├── /back/                      # Backend Projects
    │   ├── /serverless/            # Serverless demo app
    │   │   ├── package.json        # Modules used by this particular app
    │   │   └── /...                # Additional app files
    │   └── /...                    # Additional services can be added here
    ├── /node_modules/              # 3rd-party libraries and utilities
    │── package.json                # Modules used by the project
    └── Makefile                    # Various useful scripts
~~~~

This project is structured such that multiple frontend and backend apps can co-exist. Frontend apps are stored in the `<repo-root>/front` subdirectory, each containing its own `package.json`. Backend apps follow a similar convention and are stored in `<repo-root>/back/`. The root of the repo also contains its own `package.json` which contains mostly utilities.

## Getting Started on OSX

**Step 1:** Install node v7.4.0 or newer

**Step 2:** Install Docker for Mac

**Step 3:** Clone this repository

**Step 4:** Make sure the following environment variables are defined and exported

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET
- TWITTER_ACCESS_TOKEN_KEY
- TWITTER_ACCESS_TOKEN_SECRET

**Step 5:** Install yarn

        npm install yarn

**Step 4:** Install packages 

        # relative to <repo-root>
        yarn install

        # relative to <repo-root>/back/serverless
        yarn install

        # relative to <repo-root>/back/twitterdemo
        yarn install

**Step 5:** Start local dynamodb

        # relative to <repo-root>/back/serverless
        docker-compose up -d

***Step 6:*** Start local backend app

        # relative to <repo-root>/back/serverless
        npm start                   # Runs in foreground, bg it if necessary

***Step 7:*** Start local frontend app

        # relative to <repo-root>/front/twitterdemo
        npm start                   # Runs in a foreground, bg it if necessary

**Step 8:** Open browser to `http://localhost:8080/`

## Backend serverless app details

**Note:** commands in this section are relative to `<repo-root>/back/serverless`

Backend assets are deployed using Serverless to AWS Lambda. 

### Linting

        npm run lint
        # tip: linting should automatically occur during commits

### Tests

        npm test

### Coverage

        npm run coverage

### Building assets and deploying to AWS Lambda

make sure the settings in `./serverless.yml` and `./bin/buildsrc/serverless.yml` are correct

        npm run build
        # outputs to the ./build directory

        npm run build

## Frontend twitterdemo app details

**Note:** commands in this section are relative to `<repo-root>/front/twitterdemo`

Frontend assets are compiled with webkit and pushed to AWS S3

### Linting

        npm run lint
        # tip: linting should automatically occur during commits

### Tests

        npm test

### Coverage

        npm run coverage

### Building assets and deploying to AWS S3

make sure the settings in `serverless.yml` are correct

        npm run build
        # outputs to the ./build directory

        npm run deploy
