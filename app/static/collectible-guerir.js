function creerCollectibleGuerir(jeu, niveau, vie = 1) {
  var objet = Object.create(creerCollectible(jeu, niveau));

  objet.activer = function() {
    this.guerirJoueur()
  };

  objet.guerirJoueur=function(){
    utilitaires().modifierNombreDeVies(vie)
  };

  objet.bouger($('.panneau-jeu'));

  objet.objet.addClass("collectible-guerir")

  return objet;
}
