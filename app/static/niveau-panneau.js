var NiveauPanneauFactory = (function () {
  var instance;

  function createInstance(identifiant) {
    var objet = Object.create(niveau1(true));

    objet.indentifiant = identifiant;
    objet.getNom = function() {
      return identifiant;
    };
    objet.niveauSuivant = function(){
      return niveau1();
    };
    objet.niveauPrecedent = function(){
      return false;
    };
    objet.nombredePoints = function(){
      return 0;
    };
    objet.vies = function(){
      return 0;
    };
    objet.invincibleDebut = function(){
      return 0;
    };
    objet.infectes = function(){
      return 0;
    };
    objet.niveauPanneau = function() {
      return true;
    };
    objet.getPanneau = function() {
      return this.indentifiant;
    };

    return objet;

  }

  return {
    instance: function (create_new, identifiant) {
      if (!instance) {
        instance = createInstance(identifiant);
      }
      if (create_new) {
        return createInstance(identifiant);
      }
      return instance;
    }
  };
})();

function niveauPanneau(create_new = false, identifiant) {
  return NiveauPanneauFactory.instance(create_new, identifiant);
}
