var NiveauTutoriel4Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveauTutoriel3(true));

    objet.getNom = function() {
      return "Niveau Tutoriel 4";
    };
    objet.asymptomatique = function() {
      return 50;
    };
    objet.instructions = function() {
      return "Les points jaunes agissent de la même maniere que les points verts mais ne changeront pas de couleurs lorsqu'ils seront infectes.";
    };
    objet.niveauSuivant = function() {
      return niveauTutoriel5();
    };
    objet.niveauPrecedent = function() {
      return niveauTutoriel3();
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

function niveauTutoriel4(create_new = false) {
  return NiveauTutoriel4Factory.instance(create_new);
}
