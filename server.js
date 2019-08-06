const express = require('express');
const next = require('next');
const { default: nextI18NextMiddleware } = require('next-i18next/middleware');

const nextI18next = require('./utils/i18n/i18n');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

const app = next({ dev: NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const main = async () => {
  await app.prepare();

  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));
  server.get('*', (req, res) => handle(req, res));

  await server.listen(PORT);

  return `http://localhost:${PORT}`;
};

main()
  .then((address) => console.log(`🤘 Server ready at ${address}`))
  .catch((error) => console.log(`💀 Cannot start server: ${error}`));
