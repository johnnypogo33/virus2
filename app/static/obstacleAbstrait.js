function creerObstacle(jeu, niveau, left = -1, width = 10, top = -1, height = 10) {
  var objet = Object.create(creerPoint(jeu, niveau));

  objet.utiliserBalise($('.obstacle.modele').clone().removeClass('modele'));
  objet.placerAleatoire();

  objet.objet.css('width', width);
  objet.objet.css('height', height);
  if(left!==-1){
    objet.setLeft(left);
  }
  if(top!==-1){
    objet.setTop(top);

  }

  
  return objet;
}
