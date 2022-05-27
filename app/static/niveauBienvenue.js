var NiveauBienvenueFactory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau1(true));

    return objet;

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

function niveauBienvenue(create_new = false) {
  return NiveauBienvenueFactory.instance(create_new);
}
