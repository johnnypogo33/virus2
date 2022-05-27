var Niveau5Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau3(true));

    objet.getNom = function() {
      return "Niveau 5";
    };
    objet.niveauSuivant = function() {
      return niveauPanneau(true, 'panneau-final');
    };
    objet.niveauPrecedent = function() {
      return niveau4();
    };
    objet.nombredePoints = function(){
      return 100;
    };
    objet.infectes = function(){
      return 20;
    };
    objet.preparer = function(jeu) {
      // Ne rien faire, d'autres niveaux peuvent, par exemple, ajouter des
      // nouvelles fonctionalites comme des collectibles ou autres...
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleObjectif(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleGuerir(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleGuerir(jeu, this).bouger($('.panneau-jeu'));
      creerCollectibleGuerir(jeu, this).bouger($('.panneau-jeu'));
      objet.objectifCollectibles = objectifCollectibles(this);
      objet.objectifs = [
        objet.objectifCollectibles
      ];
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

function niveau5(create_new = false) {
  return Niveau5Factory.instance(create_new);
}
