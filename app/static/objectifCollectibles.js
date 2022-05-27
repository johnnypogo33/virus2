function objectifCollectibles(niveau) {
  var objet = Object.create(objectifAbstrait(niveau));

  /**
   * Recalculer le nombre (quantite) de collectibles restants.
   */
  objet.recalculer = function() {
    // Calculer le nombre de balises "collectible" dans le panneau.
    var quantite = $('.panneau-jeu .collectible-objectif').length;
    utilitaires().setInfo('collectibles-restants', quantite);
      if(quantite <= 0){
        this.continuerJeu();
      }
  }

  objet.activer = function() {

    $('.espace-objectif').append('<span>VOUS DEVEZ PRENDRE <span class="collectibles-restants">' + $('.panneau-jeu .collectible-objectif').length + '</span> COLLECTIBLES POUR GAGNER. </span>');
  }

  return objet;
}
