function createInstanceManager({ repository }) {
  function deploy(activityID) {
    const existing = repository.findInstance(activityID);
    if (existing) {
      return existing;
    }
    return repository.saveInstance({
      activityID,
      createdAt: new Date().toISOString(),
    });
  }

  return { deploy };
}

module.exports = { createInstanceManager };
