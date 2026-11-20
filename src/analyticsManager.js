const quantAnalytics = [
  { name: 'concluida', type: 'boolean' },
  { name: 'casosCorretos', type: 'integer' },
  { name: 'tentativas', type: 'integer' },
  { name: 'tempoMelhorTentativaSegundos', type: 'integer' },
  { name: 'tempoTotalSegundos', type: 'integer' },
];

const qualAnalytics = [{ name: 'discrepanciasFalhadas', type: 'text/plain' }];

const sampleStudents = [
  {
    inveniraStdID: '1',
    values: {
      concluida: true,
      casosCorretos: 3,
      tentativas: 2,
      tempoMelhorTentativaSegundos: 412,
      tempoTotalSegundos: 805,
      discrepanciasFalhadas: 'IVA',
    },
  },
  {
    inveniraStdID: '2',
    values: {
      concluida: true,
      casosCorretos: 2,
      tentativas: 1,
      tempoMelhorTentativaSegundos: 530,
      tempoTotalSegundos: 530,
      discrepanciasFalhadas: 'quantidade',
    },
  },
];

function getAnalyticsList() {
  return { qualAnalytics, quantAnalytics };
}

function getAnalytics() {
  const withValue = (definitions, values) =>
    definitions.map((definition) => ({ ...definition, value: values[definition.name] }));

  return sampleStudents.map(({ inveniraStdID, values }) => ({
    inveniraStdID,
    quantAnalytics: withValue(quantAnalytics, values),
    qualAnalytics: withValue(qualAnalytics, values),
  }));
}

module.exports = { getAnalyticsList, getAnalytics };
