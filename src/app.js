const express = require('express');
const configManager = require('./configManager');
const analyticsManager = require('./analyticsManager');
const { createRepository } = require('./repository');
const { createInstanceManager } = require('./instanceManager');
const { createController } = require('./controller');

function createApp() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json());

  const repository = createRepository();
  const instanceManager = createInstanceManager({ repository });

  app.use(createController({ configManager, instanceManager, analyticsManager }));

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).type('text').send('JSON inválido.');
    }
    next(err);
  });

  return app;
}

module.exports = { createApp };
