function fonctionDevPerdreNiveau(niveau) {
  var objet = Object.create(fonctionDevAbstrait(niveau));

  objet.etiquetteBouton = function() {
    return "Perdre niveau";
  };

  objet.action = function() {
    this.niveau.perdre();
  };

  return objet;
}
