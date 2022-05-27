var Niveau4Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau3(true));

    objet.getNom = function() {
      return "Niveau 4";
    };
    objet.niveauSuivant = function() {
      return niveau5();
    };
    objet.niveauPrecedent = function() {
      return niveau3();
    };
    objet.nombredePoints = function(){
      return 100;
    };
    objet.infectes = function(){
      return 20;
    };
    objet.pourcentageIntelligents = function(){
      return 5/100;
    };
    objet.preparer = function(jeu) {
      creerCollectibleAvancerTemps(jeu, objet);
      creerCollectibleAvancerTemps(jeu, objet);
      this.objectifs = [
        objectifTemps(this),
      ];
    }

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

function niveau4(create_new = false) {
  return Niveau4Factory.instance(create_new);
}
