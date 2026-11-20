const express = require('express');
const configManager = require('./configManager');
const { createRepository } = require('./repository');
const { createInstanceManager } = require('./instanceManager');
const { createController } = require('./controller');

function createApp() {
  const app = express();
  app.set('trust proxy', true);

  const repository = createRepository();
  const instanceManager = createInstanceManager({ repository });

  app.use(createController({ configManager, instanceManager }));
  return app;
}

module.exports = { createApp };
