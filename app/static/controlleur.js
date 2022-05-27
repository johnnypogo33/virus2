var ControlleurFactory = (function () {
  var instance;

  function createInstance() {
    return {
      niveauActuel: niveau1(),

      commencerJeu: function() {
        this.montrerEcranBienvenue();
        accepterBarreEspacement();

        $('.ecran-de-bienvenue .jeu .infos').remove();
        $('.ecran-de-bienvenue .jeu').css('background', 'none');

        var that = this;

        this.associerBoutons();
      },

      jeuDeBienvenue: creerNouveauJeu('.jeu', {
        getNom: function() {
          return 'Bienvenue';
        }
      }, '.ecran-de-bienvenue'),

      montrerEcranBienvenue: function() {
        this.montrerPanneau('ecran-de-bienvenue');

        for (i = 0; i < 10; ++i) {

          var point = creerPoint(this.jeuDeBienvenue, niveauBienvenue());
          point.creerNouveau();
          point.objet.addClass('point-de-bienvenue');
          point.objet.attr('data-vitesse', 1);
          point.placerAleatoire();
          point.choisirDestination();
          point.bouger($('.ecran-de-bienvenue'));
        }
      },

      montrerPanneau: function(panneau) {
        $('.panneau-jeu .jeu').remove();
        $('.panneau').hide();
        $('.' + panneau).show();
        this.niveauActuel.stopMusique()
        $('.boutons-dev').empty()
      },

      gameOver: function() {
        this.montrerPanneau('game-over');
        this.niveauActuel.perdre();
        effetsSonores().play('audio/OldSchool44.wav');
        musique().pause();
        var that = this;
          $('.game-over .bouton-prochain-niveau').hide()
        setTimeout(function() {
          var that2 = that;

          var label = 'Recommencez au '+ that2.niveauActuel.getNom();

          $('.game-over .bouton-prochain-niveau').html(label).show().off().click(function() {
            that2.commencerNiveau(that2.niveauActuel);
            $('.cache-pour-une-seconde').hide();
          });
        }, 1050);
      },

      jeu: false,

      creerObstaclesrebords: function(niveau, thickness){
        // (jeu, this, left, width, top, height)
        creerObstacle(this.jeu, niveau, 0, thickness, 0, this.jeu.getBottom());
        creerObstacle(this.jeu, niveau, thickness, this.jeu.getRight() - thickness*2, 0,  thickness);
        creerObstacle(this.jeu, niveau, this.jeu.getRight() - thickness, thickness, 0, this.jeu.getBottom());
        creerObstacle(this.jeu, niveau, thickness, this.jeu.getRight() - thickness*2, this.jeu.getBottom() - thickness,  thickness);},

      associerBoutons: function(){
        var that = this
        $('button').off().click(function() {effetsSonores().play('audio/Click1.wav')})
        $('.bouton-prochain-niveau').click(function() {
          $('.ecran-de-bienvenue .jeu').remove();
          that.commencerNiveau(niveau1());
        });
        $('.bouton-niveau-tutoriel').click(function() {
          $('.ecran-de-bienvenue .jeu').remove();
          that.commencerNiveau(niveauTutoriel1());
        });
        $('.bouton-niveau-creation').click(function() {
          $('.ecran-de-bienvenue .jeu').remove();
          that.commencerNiveau(niveauCreation());
        });
        $('.bouton-menu').click(function() {
          that.montrerEcranBienvenue();
        });
        $('.bouton-selection-niveau').click(function() {
          $('.ecran-de-bienvenue .jeu').remove();
          that.montrerPanneau('selection-niveau');
        });
        niveau1().boutonAssocier($('.bouton-niveau-1'), this);
        niveau2().boutonAssocier($('.bouton-niveau-2'), this);
        niveau3().boutonAssocier($('.bouton-niveau-3'), this);
        niveau4().boutonAssocier($('.bouton-niveau-4'), this);
        niveau5().boutonAssocier($('.bouton-niveau-5'), this);

      },

      commencerNiveau: function(niveau) {
        this.niveauActuel = niveau;

        if (niveau.niveauPanneau()) {
          this.montrerPanneau(niveau.getPanneau());
          return;
        }

        niveau.commencerMusique();

        this.montrerPanneau('panneau-jeu');
        $('.panneau-jeu .jeu').remove();
        this.jeu = creerNouveauJeu('.jeu', niveau);

        if (utilitaires().isDev()) {
          niveau.fonctionsDev().forEach(function(item, index){
            var classe_bouton = "bouton-" + Math.floor(Math.random() * 1000000000000000000000);
            $('.boutons-dev').append('<button class="' + classe_bouton + '">' + item.etiquetteBouton() + "</button>");

            $('.boutons-dev .' + classe_bouton).click(function() {
              item.action();
            });
          });
        }

        $('.panneau-jeu .instructions .texte').html(niveau.instructions());
        $('.panneau-jeu .nombre-de-vies').html(niveau.vies());
        if (niveau.tutoriel()) {
          $('.panneau-jeu .niveau-non-tutoriel').remove();
          var that = this;
          $('.retour-bienvenue').off().click(function() {
            $('.panneau-jeu .jeu').remove();
            that.montrerPanneau('ecran-de-bienvenue');
          });
          if (niveau.niveauPrecedent()) {
            var that = this;
            $('.panneau-jeu .tutoriel-precedent').off().click(function() {
              $('.panneau-jeu .jeu').remove();
              that.commencerNiveau(niveau.niveauPrecedent());
            });
          }
          else {
            $('.panneau-jeu .tutoriel-precedent').remove();
          }
          if (niveau.niveauSuivant()) {
            var that = this;
            $('.panneau-jeu .tutoriel-suivant').off().click(function() {
              $('.panneau-jeu .jeu').remove();
              that.commencerNiveau(niveau.niveauSuivant());
            });
          }
          else {
            $('.panneau-jeu .tutoriel-suivant').remove();
          }
        }
        else {
          $('.panneau-jeu .instructions').remove();
        }

        var joueur = creerPoint(this.jeu, niveau);
        joueur.creerNouveau();
        niveau.placerJoueur(joueur);
        joueur.devenirJoueur();

        for (i = 0; i < niveau.nombredePoints(); ++i) {
          var point = creerPoint(this.jeu, niveau);
          point.creerNouveau();
          point.placerAleatoire();
          point.devenirIntelligent(niveau.pourcentageIntelligents());
          if (i < niveau.infectes()) {
            point.infecter(100/100);
          }
          else if (i < niveau.asymptomatique()) {
            point.devenirAsymptomatique(100/100);
          }
          point.choisirDestination();
          point.bouger($('.panneau-jeu'));
        }

        // if (!niveau.tutoriel()) {
        //   utilitaires().setInfo('temps-restant', niveau.duree());
        //   this.continuerDecompte(1);
        // }

        niveau.preparer(this.jeu);
        niveau.activerObjectifs();
      }
    };
  }

  return {
    instance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

function controlleur() {
  return ControlleurFactory.instance();
}
