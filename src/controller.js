const express = require('express');

function createController({ configManager, instanceManager, analyticsManager }) {
  const router = express.Router();

  router.get('/configuracao', (req, res) => {
    res.type('html').send(configManager.getConfigurationPage());
  });

  router.get('/json-params', (req, res) => {
    res.json(configManager.getParametersList());
  });

  router.get('/deploy', (req, res) => {
    const activityID = req.query.activityID;
    if (typeof activityID !== 'string' || activityID.trim() === '') {
      return res.status(400).type('text').send('Parâmetro activityID em falta.');
    }

    const instance = instanceManager.deploy(activityID.trim());
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.type('text').send(`${baseUrl}/atividade/${encodeURIComponent(instance.activityID)}`);
  });

  router.get('/lista-analytics', (req, res) => {
    res.json(analyticsManager.getAnalyticsList());
  });

  router.post('/analytics', (req, res) => {
    const activityID = req.body && req.body.activityID;
    if (typeof activityID !== 'string' || activityID.trim() === '') {
      return res.status(400).type('text').send('Campo activityID em falta.');
    }

    res.json(analyticsManager.getAnalytics());
  });

  return router;
}

module.exports = { createController };
