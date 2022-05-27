var NiveauTutoriel2Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveauTutoriel1(true));

    objet.getNom = function() {
      return "Niveau Tutoriel 2";
    };
    objet.nombredePoints = function() {
      return 1;
    };
    objet.infectes = function() {
      return 1;
    };
    objet.instructions = function() {
      return "Les points rouges sont contagieux. Evitez-les ou ils vont vous infecter.";
    };
    objet.niveauSuivant = function() {
      return niveauTutoriel3();
    };
    objet.niveauPrecedent = function() {
      return niveauTutoriel1();
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

function niveauTutoriel2(create_new = false) {
  return NiveauTutoriel2Factory.instance(create_new);
}
