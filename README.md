# Blog Post Code for "Setting Up Serverless Web App in AWS" Article

Link to the article [here]().

## Install Dependencies

1. Install pnpm: `npm i pnpm -g`
2. install dependencies: `pnpm i`

## Local Development

Run with docker compose on linux: `docker-compose up -V --build`

## Deployment

Inside the `infrastructure` run:

```
npm run deploy -- --context zoneName=yy.com --context zoneId=xxx
```
