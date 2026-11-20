const express = require('express');

function createController({ configManager, instanceManager, analyticsManager }) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.type('html').send(`<!DOCTYPE html>
<html lang="pt">
<head><meta charset="utf-8"><title>Three-Way Match</title></head>
<body>
  <h1>Three-Way Match — Activity Provider</h1>
  <h2>GET</h2>
  <ul>
    <li><a href="/configuracao">/configuracao</a> (config_url)</li>
    <li><a href="/json-params">/json-params</a> (json_params_url)</li>
    <li><a href="/deploy?activityID=abc123">/deploy?activityID=abc123</a> (user_url)</li>
    <li><a href="/lista-analytics">/lista-analytics</a> (analytics_list_url)</li>
  </ul>
  <h2>POST</h2>
  <ul>
    <li>/analytics (analytics_url), corpo JSON: <code>{"activityID": "abc123"}</code></li>
  </ul>
</body>
</html>`);
  });

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
