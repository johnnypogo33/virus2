function creerCollectibleAvancerTemps(jeu, niveau, temps = 5) {
  var objet = Object.create(creerCollectible(jeu, niveau));

  objet.activer = function() {
    this.avancerTemps()
  };

  objet.avancerTemps=function(){
    utilitaires().setInfo('temps-restant', utilitaires().getInfo("temps-restant")-temps);
  };

  objet.bouger($('.panneau-jeu'));

  objet.objet.addClass("collectible-avancer-temps")

  return objet;
}
