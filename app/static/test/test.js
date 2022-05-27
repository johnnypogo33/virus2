import test from 'ava'

const my = require("/mycode/utilitaires.js")

test('fonction bougerVers() test', t => {
  t.true(my.utilitaires().bougerVers(2, 100, 18) == 20);
  t.true(my.utilitaires().bougerVers(540, 1000, 20) == 560);
  t.true(my.utilitaires().bougerVers(0, 100, 1) == 1);
  t.true(my.utilitaires().bougerVers(100, 80, 2) == 98);
})

test('function calculerDestinationLeftReelle() test', t => {
  // function (obstacles, dep_left, destination_left, top, hauteur, largeur) {
  t.true(my.utilitaires().calculerDestinationLeftReelle([], 1022, 1022, 1234, 1234, 1234) == 1022);
  t.true(my.utilitaires().calculerDestinationLeftReelle([], 2034, 8, 1234, 1234, 1234) == 8);
  t.true(my.utilitaires().calculerDestinationLeftReelle([], 8, 2000, 1234, 1234, 1234) == 2000);
  t.true(my.utilitaires().calculerDestinationLeftReelle([{
    largeur: 100,
    hauteur: 30,
    top: 0,
    left: 300
  }], 407, 397, 0, 11, 9) == 400);
  t.true(my.utilitaires().calculerDestinationLeftReelle([{
    largeur: 10,
    hauteur: 30,
    top: 10,
    left: 20
  }], 0, 100, 0, 15, 10) == 10);
});

test('function obstacleBloqueChemin() test', t => {
  // obstacleBloqueChemin: function (dep_x, dep_y, arr_x, arr_y, obst_top, obst_bottom, obst_left, obst_right) {
  t.false(my.utilitaires().obstacleBloqueChemin(5, 3, 7, 45.23, 25, 2, 1, 2));
  t.true(my.utilitaires().obstacleBloqueChemin(0, 0, 100, 100, 50, 50, 50, 50));
  t.false(my.utilitaires().obstacleBloqueChemin(0, 0, 100, 100, 50, 50, 50, 49));
  t.false(my.utilitaires().obstacleBloqueChemin(50, 50, 100, 100, 5, 5, 5, 5));
  t.false(my.utilitaires().obstacleBloqueChemin(50, 50, 100, 100, 5, 5, 60, 70));
  t.false(my.utilitaires().obstacleBloqueChemin(50, 50, 100, 100, 60, 70, 5, 5));
  t.false(my.utilitaires().obstacleBloqueChemin(0, 0, 0, 0, 0, 0, 0, 0));
  t.false(my.utilitaires().obstacleBloqueChemin(0, 0, 6, 6, 5, 2, 2, 5));
  t.true(my.utilitaires().obstacleBloqueChemin(0, 0, 6, 6, 2, 5, 2, 5));
  t.false(my.utilitaires().obstacleBloqueChemin(0, 0, 100, 100, 150, 50, 50, 150));
  t.true(my.utilitaires().obstacleBloqueChemin(0, 0, 100, 100, 50, 150, 50, 150));
  t.false(my.utilitaires().obstacleBloqueChemin(0, 0, 6, 6, 3, 2, 0, 1));
  t.false(my.utilitaires().obstacleBloqueChemin(1077, 155, 1127, 155, 161, 150, 1110, 1120));
  t.true(my.utilitaires().obstacleBloqueChemin(1077, 155, 1127, 155, 150, 161, 1110, 1120));
  t.false(my.utilitaires().obstacleBloqueChemin(333, 185, 338, 185, 190, 180, 330, 340));
  t.true(my.utilitaires().obstacleBloqueChemin(333, 185, 338, 185, 180, 190, 330, 340));
  t.true(my.utilitaires().obstacleBloqueChemin(416, 0, 397, 0, 0, 30, 300, 400));
})
test('fonction chiffreEntreDeuxChiffres() test', t => {
  t.true(my.utilitaires().chiffreEntreDeuxChiffres(0, 0, 0));
  t.true(my.utilitaires().chiffreEntreDeuxChiffres(44.22, 1948, 45));
  t.true(my.utilitaires().chiffreEntreDeuxChiffres(1948, 44.22, 45));
  t.true(my.utilitaires().chiffreEntreDeuxChiffres(1/1000, 2/1000, 1.5/1000));
  t.true(my.utilitaires().chiffreEntreDeuxChiffres(-45, 58, 0));
  t.true(my.utilitaires().chiffreEntreDeuxChiffres(-45, -1000, -100));
  t.true(my.utilitaires().chiffreEntreDeuxChiffres(-1000, -45, -100));
  t.false(my.utilitaires().chiffreEntreDeuxChiffres(1000, 1000, 999.99));
  t.false(my.utilitaires().chiffreEntreDeuxChiffres(0, 0, 9));
  t.false(my.utilitaires().chiffreEntreDeuxChiffres(-50, -100, 75));
  t.false(my.utilitaires().chiffreEntreDeuxChiffres(-50, -100, -125));
})

test('fonction yCorrespondantAX() test', t => {
  t.true(my.utilitaires().yCorrespondantAX({x: 1077, y: 155}, {x: 1127, y: 155}, 1110) == 155);
  t.true(my.utilitaires().yCorrespondantAX({x: 0, y: 0}, {x: 1, y: 1}, 1) == 1);
  t.true(my.utilitaires().yCorrespondantAX({x: 1, y: 1}, {x: 0, y: 0}, 0) == 0);
  t.true(my.utilitaires().yCorrespondantAX({x: 0, y: 0}, {x: 2, y: 1}, 1) == 0.5);
  t.true(my.utilitaires().yCorrespondantAX({x: 2, y: 1}, {x: 0, y: 0}, 1) == 0.5);
  t.true(my.utilitaires().yCorrespondantAX({x: 1, y: 1}, {x: 5, y: 3}, 4) == 2.5);
  t.true(my.utilitaires().yCorrespondantAX({x: 0, y: 0}, {x: 1, y: 1}, 1) == 1);
  t.true(my.utilitaires().yCorrespondantAX({x: 0, y: 0}, {x: 2, y: 1}, 1) == 0.5);
  t.true(my.utilitaires().yCorrespondantAX({x: 5, y: 3}, {x: 1, y: 1}, 4) == 2.5);
  t.true(my.utilitaires().yCorrespondantAX({x: 1, y: 1}, {x: 5, y: 3}, 11) == 6);
  t.true(my.utilitaires().yCorrespondantAX({x: 3, y: 45.2}, {x: 2, y: -3}, 2.5) == 26.1);
  try {
    t.true(my.utilitaires().yCorrespondantAX({x: 30, y: 30}, {x: 30, y: 725}, 20) == "n'importe quoi");
    // ceci n'arrive jamais car la fonction ci-dessus lance une exception.
    t.false(true);
  }
  catch (err) {
    t.true(true);
  }
})

test('fonction obstacleEntrePoints() test', t => {
  t.true(my.utilitaires().obstacleEntrePoints({
    x: 0,
    y: 0
  }, {
    x: 5,
    y: 7
  }, {
    x: 2.5,
    y: 3.5
  }));
  t.false(my.utilitaires().obstacleEntrePoints({
    x: 0,
    y: 0
  }, {
    x: 2.5,
    y: 3.5
  }, {
    x: 5,
    y: 7
  }));
  // Si depart et arrivee sont identiques, on retourne faux meme si on
  // se trouve sur un obstacle.
  t.false(my.utilitaires().obstacleEntrePoints({
    x: 3,
    y: 3
  }, {
    x: 3,
    y: 3
  }, {
    x: 3,
    y: 3
  }));
  t.false(my.utilitaires().obstacleEntrePoints({
    x: 0,
    y: 0
  }, {
    x: 5,
    y: 7
  }, {
    x: 1,
    y: 5
  }));
})
