function fonctionDevGagnerNiveau(niveau) {
  var objet = Object.create(fonctionDevAbstrait(niveau));

  objet.etiquetteBouton = function() {
    return "Gagner niveau";
  };

  objet.action = function() {
    this.niveau.gagner();
  };

  return objet;
}
