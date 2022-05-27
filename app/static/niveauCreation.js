var NiveauCreationFactory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveauAbstrait());

    objet.getNom = function() {
      return "Niveau Creation";
    };
    objet.asymptomatique = function(){
      return 0;
    };
    objet.gagner = function() {
      if (this.objectifs.length == 0) {
        alert("Le " + this.getNom() + " n'a pas d'objectif");
        return;
      }
      this.objectifs[0].continuerJeu();
    };
    objet.niveauSuivant = function(){
      return niveau2();
    };
    objet.endurancejoueur = function(){
      return 50000/$('input.endurance').val();
    },
    objet.niveauPrecedent = function(){
      return false;
    };
    objet.fonctionsDev = function() {
      return [
        fonctionDevGagnerNiveau(this),
        fonctionDevPerdreNiveau(this)
      ];
    };
    objet.preparer = function(jeu) {
      this.objectifs = [
      ];
      controlleur().creerObstaclesrebords(this, 75);

      // Ajouter l'interface de création de niveau.
      $('.panneau-jeu').after(`
        <div class="texte-creation-niveau">
          Voici les controlleurs de cr&eacute;ation de jeu
          <div>Endurance: <input type="text" value="100" class="endurance" name="endurance" div="" />
        </div>
        </div>
        `);
    };
    objet.terminerNiveau = function() {
      $('.texte-creation-niveau').remove();
    };
    objet.nombredePoints = function(){
      return 66;
    };
    objet.vies = function(){
      return 3;
    };
    objet.tutoriel = function() {
      return true;
    };
    objet.instructions = function(){
      return "";
    };
    objet.duree = function() {
      return 30;
    };
    objet.invincibleDebut = function(){
      return 3000;
    };
    objet.placerJoueur = function(joueur) {
      // Par exemple, joueur.placerAleatoire();
      joueur.placerCentre();
    };
    objet.tutoriel = function(){
      return false;
    };
    objet.infectes = function(){
      return 6;
    };
    objet.niveauPanneau = function() {
      return false;
    };
    objet.vitesse = function() {
      return 5;
    };
    objet.vitessejoueur = function() {
      return 10;
    };
    objet.statutAccessible = true;
    objet.collectibleretire = function() {
      // Recalculer le nombre de collectibles restants pour permettre de
      // compléter l'objectif "collectible".
      if (this.objectifCollectibles !== undefined) {
        this.objectifCollectibles.recalculer();
      }
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

function niveauCreation(create_new = false) {
  return NiveauCreationFactory.instance(create_new);
}
