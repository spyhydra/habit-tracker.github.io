const express = require('express');
const router = express.Router();
const passport = require('passport');



const usersController = require('../controller/users_controller');
const habitController = require('../controller/habit_controller')



router.get('/userhabit', passport.checkAuthentication, usersController.profile);



router.get('/signup', usersController.signUp);


router.get('/login', usersController.signIn);
router.post('/create', usersController.createing);
router.get('/logout', usersController.destroySession)
router.post('/create-session', passport.authenticate(
    'local', {
        failureRedirect: '/users/login'
    },
), usersController.createSession);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: 'users/login'
}), usersController.createSession)
router.get('/week', usersController.practice)
router.get('/destroy/:id', usersController.destroy);


module.exports = router;