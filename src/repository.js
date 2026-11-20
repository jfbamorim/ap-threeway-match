function createRepository() {
  const instances = new Map();

  return {
    saveInstance(instance) {
      instances.set(instance.activityID, instance);
      return instance;
    },

    findInstance(activityID) {
      return instances.get(activityID);
    },
  };
}

module.exports = { createRepository };
