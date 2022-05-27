var NiveauTutorielFactory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau1(true));

    objet.getNom = function() {
      return "Niveau Tutoriel 1";
    };
    objet.nombredePoints = function() {
      return 0;
    };
    objet.instructions = function() {
      return "Vous êtes le point blanc. Vous pouvez bouger avec les fleches.";
    };
    objet.tutoriel = function() {
      return true;
    };
    objet.fonctionsDev = function() {
      return [];
    };
    objet.invincibleDebut = function() {
      return 0;
    };
    objet.preparer = function(jeu) {
      // left, width, top, height
      creerObstacle(jeu, this, 300, 103, 503, 50);
      creerObstacle(jeu, this, 800, 53, 43, 300);
    };
    objet.niveauSuivant = function() {
      return niveauTutoriel2();
    };

    objet.getMusique = function() {
      return 'audio/Detective.wav';
    },

    objet.statutAccessible = true;

    objet.niveauPrecedent = function() {
      return false;
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

function niveauTutoriel1(create_new = false) {
  return NiveauTutorielFactory.instance(create_new);
}
