function utilitaires() {
  return {
    mapKeycodeDir: function(code) {
      switch (code) {
        case 39:
          return 'right';
        case 37:
          return 'left';
        case 38:
          return 'up';
        case 40:
          return 'down';
        default:
          return '';
      }
    },

    objetExiste: function(obj) {
      // Voir https://stackoverflow.com/questions/3086068/how-do-i-check-whether-a-jquery-element-is-in-the-dom

      return obj.closest(document.documentElement).length;
    },

    random: function(from, to) {
      var range = to - from;
      var rand_in_range = Math.round(Math.random() * range);
      return rand_in_range + from;
    },

    /**
     * Calculer une destination horizontale reelle.
     *
     * @param obstacles
     *   Une liste d'obstacles, chacune ayant largeur, hauteur, top et left.
     * @param dep_left
     *   Position horizontale actuelle du joueur.
     * @param destination_left
     *   Où notre joueur veut aller (sur le plan horizontal).
     * @param top
     *   La position de notre joueur sur le plan vertical.
     * @param hauteur
     *   Hauteur du joueur.
     * @param largeur
     *   Largeur du joueur.
     *
     * @return
     *   Une destination left où on devrait reellement aller.
     *
     * @throws \Exception
     */
    calculerDestinationLeftReelle: function(obstacles, dep_left, destination_left, top, hauteur, largeur, test_bottom = false) {
      // eviter de tout calculer si notre destination est egale a notre point
      // de depart.
      if (destination_left == dep_left) {
        return destination_left;
      }

      var destination_left_reelle = destination_left;

      obstacles.forEach(function (item, index) {
        var bottom = item.top + item.hauteur;
        var right = item.left + item.largeur;

        // Je recule
        if (dep_left > destination_left) {
          var dep_avec_largeur = dep_left;
          var dest_avec_largeur = destination_left_reelle;
        }
        // J'avance
        else {
          var dep_avec_largeur = dep_left + largeur;
          var dest_avec_largeur = destination_left_reelle + largeur;
        }

        bloque = utilitaires().obstacleBloqueChemin(dep_avec_largeur, top, dest_avec_largeur, top, item.top, bottom, item.left, right);

        var destination_left_reelle_candidat = destination_left_reelle;

        if(bloque && destination_left_reelle > dep_left){
          destination_left_reelle_candidat = item.left - largeur;
        }
        else if(bloque && destination_left_reelle < dep_left){
          destination_left_reelle_candidat = right;
        }

        if(utilitaires().chiffreEntreDeuxChiffres(dep_left, destination_left_reelle, destination_left_reelle_candidat)){
          destination_left_reelle = destination_left_reelle_candidat
        }
      });

      if (destination_left_reelle == destination_left && test_bottom == false) {
        top = top + hauteur;
        return this.calculerDestinationLeftReelle(obstacles, dep_left, destination_left, top, hauteur, largeur, true);
      }

      return destination_left_reelle;
    },

    bougerVers: function(start, dest, vitesse) {
      if (dest > start) {
        return start + Math.min(vitesse, dest - start);
      }
      else if (dest < start) {
        return start + Math.max(vitesse * -1, dest - start);
      }
      else {
        return start;
      }
    },

    obstacleEntrePoints: function(depart, arrivee, pos_obstacle) {
      if (depart.x == arrivee.x && depart.y == arrivee.y) {
        return false;
      }

      // Voir
      // https://stackoverflow.com/questions/11907947/how-to-check-if-a-point-lies-on-a-line-between-2-other-points

      var dxc = pos_obstacle.x - depart.x;
      var dyc = pos_obstacle.y - depart.y;

      var dxl = arrivee.x - depart.x;
      var dyl = arrivee.y - depart.y;

      cross = dxc * dyl - dyc * dxl;

      if (cross != 0) {
        // on n'est pas sur la même ligne.
        return false;
      }

      return this.chiffreEntreDeuxChiffres(depart.x, arrivee.x, pos_obstacle.x) && this.chiffreEntreDeuxChiffres(depart.y, arrivee.y, pos_obstacle.y);
    },

    // Par exemple, si
    // depart est {x: 1077, y: 155}
    // arrivee est {x: 1127, y: 155}
    // et x est 1110
    // je m'attends a la reponse 155.
    yCorrespondantAX: function(depart, arrivee, x) {
      if (arrivee.x == depart.x) {
        throw "impossible"
      }

      if (depart.y == arrivee.y) {
        return depart.y;
      }

      // par exemple, r = 1077 + 0.
      var r = Math.min(depart.x, arrivee.x) + (Math.abs(arrivee.y - depart.y) * (x - Math.min(depart.x, arrivee.x)) / Math.abs(arrivee.x - depart.x));
      return r;
    },

    /**
     * Verifie si un obstabcle bloque notre chemin.
     *
     * @param dep_x
     *   Les coordonnees x de notre point de depart.
     * @param dep_y
     *   Les coordonnees y de notre point de depart.
     * @param arr_x
     *   La où on veut aller (coordonnees x).
     * @param arr_y
     *   La où on veut aller (coordonnees y).
     * @param obst_top
     *   Le top de notre obstacle.
     * @param obst_bottom
     *   Le bottom de notre obstacle.
     * @param obst_left
     *   La gauche de notre obstacle.
     * @param obst_right
     *   La droite de notre obstacle.
     *
     * @return bool
     *   Vrai si notre obstacle bloque notre chemin.
     */
    obstacleBloqueChemin: function (dep_x, dep_y, arr_x, arr_y, obst_top, obst_bottom, obst_left, obst_right) {

      // Si l'obstacle a un volume negatif, il ne nous bloque pas.
      if (obst_right < obst_left || obst_top > obst_bottom) {
        return false;
      }
      if (obst_right < Math.min(dep_x, arr_x) || obst_left > Math.max(dep_x, arr_x)) {
        return false;
      }
      //
      if (obst_bottom < Math.min(dep_y, arr_y) || obst_top > Math.max(dep_y, arr_y)) {
        return false;
      }
      // Trouver l'intersection avec le bottom
      // si x est le bottom, c'est quoi le y?
      if (dep_y !== arr_y) {
        var x = this.yCorrespondantAX({x: dep_y, y: dep_x}, {x: arr_y, y: arr_x}, obst_bottom);

        if (this.chiffreEntreDeuxChiffres(obst_left, obst_right, x)) {
          return true;
        }

        var x = this.yCorrespondantAX({x: dep_y, y: dep_x}, {x: arr_y, y: arr_x}, obst_top);
        if (this.chiffreEntreDeuxChiffres(obst_left, obst_right, x)) {
          return true;
        }
      }

      if (dep_x !== arr_x) {
        // Par exemple, pour 1077, 155, 1127, 155, avec 1110, je m'attends a
        // la reponse 155.
        var y = this.yCorrespondantAX({x: dep_x, y: dep_y}, {x: arr_x, y: arr_y}, obst_left);

        if (this.chiffreEntreDeuxChiffres(obst_top, obst_bottom, y)) {
          return true;
        }

        var y = this.yCorrespondantAX({x: dep_x, y: dep_y}, {x: arr_x, y: arr_y}, obst_right);
        if (this.chiffreEntreDeuxChiffres(obst_top, obst_bottom, y)) {
          return true;
        }
      }

      return false;
    },

    chiffreEntreDeuxChiffres: function (depart, arrivee, obstacle) {
      return obstacle >= Math.min(depart, arrivee) && obstacle <= Math.max(depart, arrivee);
    },

    modifierNombreDeVies: function (montant) {
      nombredevies = utilitaires().getInfo('nombre-de-vies');
      var nombredevies_modifie = parseInt(nombredevies) + montant;
      utilitaires().setInfo('nombre-de-vies', nombredevies_modifie);
      return nombredevies_modifie;
    },

    trouverVoisins: function(top, left, rayon, identifiant = '.point[data-infecte=non]') {
      return $('.panneau-jeu ' + identifiant).filter(function() {
        return $(this).position().top <= top + rayon &&
          $(this).position().top >= top - rayon &&
          $(this).position().left <= left + rayon &&
          $(this).position().left >= left - rayon;
      });
    },

    getEnPause: function() {
      return $('body').attr('data-en-pause') == 'oui' ? true : false;
    },

    setEnPause: function(pause) {
      $('body').attr('data-en-pause', pause ? 'oui' : 'non');
    },

    getInfo: function(parametre) {
      return $('.infos .' + parametre).html();
    },

    isDev: function() {
      var url_string = window.location.href;
      var url = new URL(url_string);

      if (url.searchParams.get('simulate-not-dev')) {
        return false;
      }

      return window.location.href.substring(0, "file".length) == "file";
    },

    // afficher une information
    // parametre: le nom de la classe, sans point, par exemple:
    // "collectibles-restants".
    setInfo: function(parametre, valeur) {
      return $('.infos .' + parametre).html(valeur);
    }
  }
}

// Required for unit tests.
if (typeof module !== "undefined") {
  module.exports = {
    utilitaires: utilitaires
  }
}
