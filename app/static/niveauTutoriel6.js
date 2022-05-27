var NiveauTutoriel6Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveauTutoriel3(true));

    objet.getNom = function() {
      return "Niveau Tutoriel 6";
    };
    objet.nombredePoints = function() {
      return 50;
    };
    objet.pourcentageIntelligents = function() {
      return 50/100;
    };
    objet.instructions = function() {
      return "Les points entourés de noir sont vos amis, ils veulent venir vous rendre visite.";
    };
    objet.niveauSuivant = function() {
      return niveauBienvenue();
    };
    objet.niveauPrecedent = function() {
      return niveauTutoriel5();
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

function niveauTutoriel6(create_new = false) {
  return NiveauTutoriel6Factory.instance(create_new);
}
