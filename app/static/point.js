function creerPoint(jeu, niveau) {
  return {
    attente: 50,

    random: Math.random(),

    retire: false,

    largeur: function() {
      return this.objet.width();
    },

    hauteur: function() {
      return this.objet.height();
    },

    niveau: niveau,

    rayon_infection: 20,

    // objet: $('.point.modele').clone().removeClass('modele').css('background-color', Math.floor(Math.random()*16777215).toString(16)),

    objet: false,

    jeu: jeu,

    utiliserBalise: function(balise) {
      this.objet = balise;
    },

    placerAleatoire: function() {
      this.objet.appendTo(this.jeu.jeuInterne());
      this.setTop(this.pointVerticalAleatoire());
      this.setLeft(this.pointHorizontalAleatoire());
    },

    placerCentre: function() {
      this.objet.appendTo(this.jeu.jeuInterne());
      this.setTop(this.pointVerticalCentre());
      this.setLeft(this.pointHorizontalCentre());
    },

    devenirJoueur: function() {
      this.objet.css('background-color', 'white');
      this.objet.attr('data-joueur', 'oui');
      this.DevenirControlable() ;
      this.devenirInvincible(niveau.invincibleDebut());
    },

    /**
     * Positionner le point gauche mais seulement si c'est possible.
     *
     * Par exemple, s'il n'y a pas d'obstacle entre le depart et la
     * destination, nous positionnerons l'item a la destination.
     *
     * S'il existe un obstacle entre le depart et la destination, le point
     * avancera jusqu'a l'obstacle. Ceci veut dire que:
     *
     * * Si la destination est superieure au depart: la gauche du point sera
     *   equivalent de la gauche de l'obstacle moins la largeur du point.
     * * Si la destination est inferieure au depart: la gauche du point sera
     *   equivalent de la droite de l'obstacle.
     * * Si la destination est egale au depart: rien n'est fait.
     *
     * Cette fonction ne retourne pas de valeur.
     *
     * @param destination_left
     *   La où le point veut aller. Il ne s'y rendra pas necessairement, par
     *   exemple s'il y a un obstacle dans son chemin.
     * @param dep_left
     *   La où le point commence (sa position actuelle).
     * @param top
     *   La position verticale du point, ou le haut du point, tant a son depart
     *   qu'a son arrivee, puisque cette fonction est conçue pour des
     *   deplacements en ligne droite seulement.
     */
    setLeftIfPossible: function(destination_left, dep_left, top) {
      // eviter de tout calculer si notre destination est egale a notre point
      // de depart.
      if (destination_left == dep_left) {
        return;
      }

      var obstacles = [];
      this.jeu.getObstacles().each(function () {
        obstacles.push({
          largeur: $(this).width(),
          hauteur: $(this).height(),
          top: $(this).position().top,
          left: $(this).position().left
        });
      });

      // obstacles, dep_left, destination_left, top, hauteur, largeur
      this.setLeft(utilitaires().calculerDestinationLeftReelle(obstacles, dep_left, destination_left, top, this.objet.height(), this.objet.width()));
    },

    setTopIfPossible: function(destination_top, dep_top, left) {
      if (destination_top == dep_top) {
        return;
      }

      var obstacles = [];
      this.jeu.getObstacles().each(function () {
        obstacles.push({
          largeur: $(this).height(),
          hauteur: $(this).width(),
          top: $(this).position().left,
          left: $(this).position().top
        });
      });

      // obstacles, dep_left, destination_left, top, hauteur, largeur
      this.setTop(utilitaires().calculerDestinationLeftReelle(obstacles, dep_top, destination_top, left, this.objet.width(), this.objet.height()));
    },

    /**
     * destination_left est un chiffre, par exemple 800, -2000.
     */
    setLeft: function(destination_left) {
      min_largeur = this.jeu.getLeft(); // ex. 0
      max_largeur = this.jeu.getRight() - this.largeur(); // ex. 400

      destination_left = Math.max(destination_left, min_largeur);
      destination_left = Math.min(destination_left, max_largeur);

      this.objet.css('left', destination_left + 'px');
    },

    setTop: function(destination_top) {
      min_hauteur = this.jeu.getTop(); // ex. 0
      max_hauteur = this.jeu.getBottom() - this.hauteur(); // ex. 400

      destination_top = Math.max(destination_top, min_hauteur);
      destination_top = Math.min(destination_top, max_hauteur);

      this.objet.css('top', destination_top + 'px');
    },

    choisirDestination: function() {
      if (this.objet.hasClass('intelligent')) {
        this.choisirDestinationIntelligente();
      }
      else {
        this.choisirDestinationAleatoire();
      }
    },

    choisirDestinationAleatoire: function() {
      this.objet.attr('data-dest-v', this.pointVerticalAleatoire());
      this.objet.attr('data-dest-h', this.pointHorizontalAleatoire());
    },

    choisirDestinationIntelligente: function() {
      // Il va toujours choisir le premier joueur s'il y en plusieurs!
      var joueurs = $('[data-joueur=oui]');
      if (joueurs.length) {
        this.objet.attr('data-dest-v', joueurs.position().top + utilitaires().random(-100, 100));
        this.objet.attr('data-dest-h', joueurs.position().left + utilitaires().random(-100, 100));
      }
      else {
        this.choisirDestinationAleatoire();
      }
    },

    randomRandom: function(from, to) {
      return utilitaires().random(from * this.random, to * this.random);
    },

    pointVerticalAleatoire: function() {
      return this.jeu.pointVerticalAleatoire(this.hauteur());
    },

    pointHorizontalAleatoire: function() {
      return this.jeu.pointHorizontalAleatoire(this.largeur());
    },

    pointVerticalCentre: function() {
      return this.jeu.pointVerticalCentre(this.hauteur());
    },

    pointHorizontalCentre: function() {
      return this.jeu.pointHorizontalCentre(this.largeur());
    },

    clignoter: function() {
      if (this.objet.attr('data-invincible') == 'non') {
        this.objet.css('background-color', 'white');
        return;
      }

      // a ce stade nous sommes invincible.

      if (this.objet.attr('data-clignotement') == 'visible') {
        this.objet.css('background-color', 'transparent');
        this.objet.attr('data-clignotement', 'invisible');
      }
      else {
        this.objet.css('background-color', 'white');
        this.objet.attr('data-clignotement', 'visible');
      }

      var that = this;
      setTimeout(function() {
        that.clignoter();
      }, 50);
    },

    devenirInvincible: function(temps) {
      if (temps > 0) {
        if (this.objet.attr('data-invincible') == 'non') {
          this.objet.attr('data-invincible', 'oui');
          this.clignoter();
        }
        var that = this;
        setTimeout(function() {
          that.devenirInvincible(utilitaires().getEnPause() ? temps : (temps - 100));
        }, 100);
      }
      else {
        this.objet.attr('data-invincible', 'non');
      }
    },

    devenirAsymptomatique: function(chance) {
      if (Math.random() < chance) {
        this.objet.attr('data-asymptomatique', 'oui');
        this.objet.css('background-color', 'yellow');
      }
    },

    effetSonore: function() {
      return 'audio/Impact7.wav';
    },

    infecter: function(chance) {

      if (Math.random() < chance) {
        if (this.objet.attr('data-joueur') == 'oui') {
          if (this.objet.attr('data-invincible') == 'non') {
            this.devenirInvincible(3000);
            effetsSonores().play(this.effetSonore())
            var nombredevies = utilitaires().modifierNombreDeVies(-1)
            if (nombredevies==0)  {
              $('.point').attr('data-vitesse', 0);
              ControlleurFactory.instance().gameOver();
            }
          }
        }
        else {
          if (this.objet.attr('data-asymptomatique') != 'oui') {
            this.objet.css('background-color', 'red');
          }
          this.objet.attr('data-infecte', 'oui');
          return true;
        }
      }
      return false;
    },

    devenirIntelligent: function(chance) {
      if (Math.random() < chance) {
        // ajouter classe intelligent.
        this.objet.addClass('intelligent');
      }
      return false;
    },

    infecterVoisins: function() {
      var top = this.objet.position().top;
      var left = this.objet.position().left;

      if (this.objet.attr('data-infecte') == 'oui') {
        utilitaires().trouverVoisins(top, left, this.rayon_infection).each(function() {
          point = creerPoint(this.jeu);
          point.utiliserBalise($( this ));
          point.infecter(100/100);
        });
      }
    },

    bouger: function(contexte) {

      if (!utilitaires().getEnPause()) {
        var top_a = this.objet.position().top;
        var left_a = this.objet.position().left;
        var top_b = this.objet.attr('data-dest-v');
        var left_b = this.objet.attr('data-dest-h');

        if (top_a == top_b && left_a == left_b) {
          this.choisirDestination();
          this.bouger(contexte);
          return;
        }

        this.setTop(utilitaires().bougerVers(top_a, top_b, this.objet.attr('data-vitesse')));
        this.setLeft(utilitaires().bougerVers(left_a, left_b, this.objet.attr('data-vitesse')));

        this.infecterVoisins();
      }

      if (contexte.is(":visible") && !this.retire && utilitaires().objetExiste(this.objet)) {
        var that = this;
        setTimeout(function() {
          that.bouger(contexte);
        }, this.attente);
      }
    },

    creerNouveau: function() {
      this.utiliserBalise($('.point.modele').clone().removeClass('modele').attr('data-vitesse', this.niveau.vitesse()).css('height', parseInt(8 + Math.random() * 5) + 'px').css('width', parseInt(8 + Math.random() * 5) + 'px'));
    },

    enTrainDavancer: {
      right: false,
      left: false,
      up: false,
      down: false,
    },

    doitAvancer: function(dir){
      if (!this.enTrainDavancer[dir]) {
        return false;
      }
      switch (dir) {
        case 'left':
          return !this.enTrainDavancer.right;
        case 'right':
          return !this.enTrainDavancer.left;
        case 'up':
          return !this.enTrainDavancer.down;
        case 'down':
          return !this.enTrainDavancer.up;
        default:
          return false;
      }
    },

    joueurContinuerAvancer: function(dir) {
      if (!this.doitAvancer(dir)) {
        return;
      }

      if(dir == 'right'){
        var left_a = this.objet.position().left;
        var left_b = left_a + this.niveau.vitessejoueur();
        this.setLeftIfPossible(left_b, left_a, this.objet.position().top);
      }
      if(dir == 'left'){
        var left_a = this.objet.position().left;
        var left_b = left_a - this.niveau.vitessejoueur();
        this.setLeftIfPossible(left_b, left_a, this.objet.position().top);
      }
      if(dir == 'up'){
        var top_a = this.objet.position().top;
        var top_b = top_a - this.niveau.vitessejoueur();
        this.setTopIfPossible(top_b, top_a, this.objet.position().left);
      }
      if(dir == 'down'){
        var top_a = this.objet.position().top;
        var top_b = top_a + this.niveau.vitessejoueur();
        this.setTopIfPossible(top_b, top_a, this.objet.position().left);
      }
      var that = this;
      setTimeout(function() {
        that.joueurContinuerAvancer(dir);
      }, this.niveau.endurancejoueur());

    },

    DevenirControlable: function() {
      var that = this;
      $('body').keydown(function(e){
        if (utilitaires().getEnPause()) {
          return;
        }
        var dir = utilitaires().mapKeycodeDir(e.keyCode);

        that.enTrainDavancer[dir] = true;
        that.joueurContinuerAvancer(dir);
      });
      $('body').keyup(function(e){
        that.enTrainDavancer[utilitaires().mapKeycodeDir(e.keyCode)] = false;
      });
    }

  };
}
