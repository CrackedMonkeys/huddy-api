/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var userRoles = {
    public: 1, // 001
    user:   2, // 010
    admin:  4  // 100
  };

var accessLevels = {
  public: userRoles.public | // 111
          userRoles.user   |
          userRoles.admin,
  anon:   userRoles.public,  // 001
  user:   userRoles.user |   // 110
          userRoles.admin,
  admin:  userRoles.admin    // 100
};

var db = {
  'demo': 'fe01ce2a7fbac8fafaed7c982a04e229',
  'atony.mtz@gmail.com': '4297f44b13955235245b2497399d7a93'
};

module.exports = {
	login: function(req, res) {
    var username = req.param('username'),
      passwd = req.param('passwd');

    if (!username || !passwd) {
      res.status(400);
      res.json({ lol: 'code' });
    }

    User.findOne({ email: username }).exec(function(err, user) {
      if (user === undefined) {
        return res.notFound();
      }
      if (err) {
        return next(err);
      }
      if (user.passwd === passwd) {
        res.json({
          'username': user.email,
          'role': userRoles.user,
          'profile': user.profile,
          'config': user.config
        });
      } else {
        res.status(400);
        res.json({ lol: 'code' });
      }
    });
  }
};

