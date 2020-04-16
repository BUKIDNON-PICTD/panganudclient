var express         = require('express'),
    routes          = express.Router();
var SyncController  = require('../controllers/synccontroller');
var userController  = require('../controllers/usercontroller');
var roleController  = require('../controllers/rolecontroller');
var passport	    = require('passport');

routes.post('/serverrequest', passport.authenticate('jwt', { session: false }),SyncController.serverrequest);
routes.post('/changepassword', passport.authenticate('jwt', { session: false }),userController.changePassword);
routes.post('/getmasterfiles', SyncController.getmasterfiles);
routes.post('/register', userController.registerUser);

routes.post('/login', userController.loginUser);

routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.username}! I open at the close.` });
});

//users
routes.get('/users', passport.authenticate('jwt', { session: false }),userController.getAll);
routes.get('/users/:id', passport.authenticate('jwt', { session: false }),userController.getById);
routes.post('/users', passport.authenticate('jwt', { session: false }),userController.create);
routes.put('/users/:id', passport.authenticate('jwt', { session: false }),userController.update);
routes.delete('/users/:id', passport.authenticate('jwt', { session: false }),userController.delete);

routes.get('/roles', passport.authenticate('jwt', { session: false }),roleController.getAll);
routes.get('/roles/:id', passport.authenticate('jwt', { session: false }),roleController.getById);
routes.post('/roles', passport.authenticate('jwt', { session: false }),roleController.create);
routes.put('/roles/:id', passport.authenticate('jwt', { session: false }),roleController.update);
routes.delete('/roles/:id', passport.authenticate('jwt', { session: false }),roleController.delete);


module.exports = routes;



