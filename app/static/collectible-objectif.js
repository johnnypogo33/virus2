function creerCollectibleObjectif(jeu, niveau, temps = 5) {
  var objet = Object.create(creerCollectible(jeu, niveau));

  objet.objet.addClass("collectible-objectif")

  return objet;
}
