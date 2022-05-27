var NiveauTutoriel5Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveauTutoriel3(true));

    objet.getNom = function() {
      return "Niveau Tutoriel 5";
    };
    objet.nombredePoints = function() {
      return 0;
    };
    objet.instructions = function() {
      return "Vous aurez besoin, parfois, de collecter des objets qui vous permettront de completer le niveau.";
    };
    objet.niveauSuivant = function() {
      return niveauTutoriel6();
    };
    objet.niveauPrecedent = function() {
      return niveauTutoriel4();
    };
    objet.preparer = function(jeu) {
      creerCollectibleAvancerTemps(jeu, this);
      creerCollectibleAvancerTemps(jeu, this);
      creerCollectibleAvancerTemps(jeu, this);
      creerCollectibleAvancerTemps(jeu, this);
      creerCollectibleAvancerTemps(jeu, this);
      creerCollectibleAvancerTemps(jeu, this);

      var c = creerCollectibleAvancerTemps(jeu, this);
      c.reapparaitre(3000, 3000)
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

function niveauTutoriel5(create_new = false) {
  return NiveauTutoriel5Factory.instance(create_new);
}
