const parameters = [
  { name: 'toleranciaPreco', label: 'Tolerância de preço (%)', defaultValue: '5' },
  { name: 'toleranciaQuantidade', label: 'Tolerância de quantidade (%)', defaultValue: '5' },
  { name: 'numeroCasos', label: 'Número de casos (2 a 5)', defaultValue: '3' },
  { name: 'percentagemDiscrepancias', label: 'Casos com discrepâncias (%)', defaultValue: '40' },
];

function getParametersList() {
  return parameters.map(({ name }) => ({ name, type: 'text/plain' }));
}

function getConfigurationPage() {
  const fields = parameters
    .map(
      ({ name, label, defaultValue }) =>
        `    <p><label>${label}<br><input type="text" name="${name}" value="${defaultValue}"></label></p>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <title>Three-Way Match</title>
</head>
<body>
  <form>
${fields}
  </form>
</body>
</html>`;
}

module.exports = { getParametersList, getConfigurationPage };
