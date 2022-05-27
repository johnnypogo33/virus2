function creerNouveauJeu(selecteur, niveau, destination = '.panneau-jeu') {
  returnvalue = {
    objet: $('.jeu.modele').clone().removeClass('modele').appendTo(destination),

    niveau: niveau,

    preparer: function() {
      $('.nom-du-niveau').html(niveau.getNom());
    },

    jeuInterne: function() {
      return this.objet.find('.jeu-interne');
    },

    getObstacles: function() {
      return $('.jeu .obstacle');
    },

    getTop: function() {
      return 0;
    },

    getLeft: function() {
      return 0;
    },

    getBottom: function() {
      return this.objet.height();
    },

    getRight: function() {
      return this.objet.width();
    },

    pointVerticalAleatoire: function(height_du_point) {
      return parseInt(Math.random() * (this.objet.height() - height_du_point));
    },

    pointHorizontalAleatoire: function(width_du_point) {
      return parseInt(Math.random() * (this.objet.width() - width_du_point));
    },

    pointVerticalCentre: function(height_du_point) {
      return parseInt(0.5 * (this.objet.height() - height_du_point));
    },

    pointHorizontalCentre: function(width_du_point) {
      return parseInt(0.5 * (this.objet.width() - width_du_point));
    }
  }

  returnvalue.preparer();

  return returnvalue;
}
