var Niveau3Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau2(true));

    objet.getNom = function() {
      return "Niveau 3";
    };
    objet.niveauSuivant = function() {
      return niveau4();
    };
    objet.niveauPrecedent = function() {
      return niveau2();
    };
    objet.nombredePoints = function(){
      return 80;
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

function niveau3(create_new = false) {
  return Niveau3Factory.instance(create_new);
}
