function getIndexPage() {
  return `<!DOCTYPE html>
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
</html>`;
}

module.exports = { getIndexPage };
