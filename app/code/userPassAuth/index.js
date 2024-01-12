/**
 * Provide user/pass authentication.
 */

class UserPassAuth extends require('../component/index.js') {

  dependencies() {
    return [
      './webAuth/index.js',
    ];
  }

  async run(app)  {

    const expressApp = app.component('./express/index.js').expressApp();

    expressApp.get('/login',
      (req, res) => res.sendFile('login.html',
      { root: '/usr/src/app/private' })
    );

    expressApp.post('/login', (req, res, next) => {
      app.component('./authentication/index.js').passport().authenticate('local',
      (err, user, info) => {
        if (err) {
          console.log('error during /login');
          console.log(err);
          return next(err);
        }

        if (!user) {
          console.log('no user during /login');
          console.log(info);
          return res.redirect('/login?info=' + info);
        }

        req.logIn(user, function(err) {
          console.log('There is a user, we are logging in');
          console.log(user);
          if (err) {
            return next(err);
          }

          return res.redirect('/');
        });
      })(req, res, next);
    });

    return this;
  }

}

module.exports = new UserPassAuth();
