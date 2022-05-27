function objectifAbstrait(niveau) {
  var ran = Math.random();

  console.log("Je cree un objectif pour niveau " + niveau.getNom() + ", son identite est " + ran)

  return {
    niveau: niveau,

    ran: ran,

    continuerJeu: function() {
      controlleur().montrerPanneau('prochain-niveau');
      var that = this;

      this.niveau.niveauSuivant().setStatutAccessible(true);

      $('.bouton-niveau-suivant').off().click(function() {
        controlleur().commencerNiveau(that.niveau.niveauSuivant());

      });
    },

    activer: function() {
    }
  }
}
