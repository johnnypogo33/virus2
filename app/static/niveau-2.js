var Niveau2Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau1(true));

    objet.getNom = function() {
      return "Niveau 2";
    };
    objet.asymptomatique = function() {
      return 30;
    };
    objet.niveauSuivant = function() {
      return niveau3();
    };
    objet.statutAccessible = false;
    objet.niveauPrecedent = function() {
      return niveau1();
    };

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

function niveau2(create_new = false) {
  return Niveau2Factory.instance(create_new);
}
