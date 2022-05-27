var EffetsSonoresFactory = (function () {
  var instance;

  function createInstance() {
    return sons();
  }

  return {
    instance: function (create_new) {
      if (!instance) {
        instance = createInstance();
      }
      if (create_new) {
        return createInstance();
      }
      return instance;
    }
  };
})();

function effetsSonores(create_new = false) {
  return EffetsSonoresFactory.instance(create_new);
}
