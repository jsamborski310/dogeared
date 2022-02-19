const router = require('express').Router();
const { Book, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const bookData = await Book.findAll(req.body
      );

    // Serialize data so the template can read it
    const books = bookData.map((book) => book.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      books, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {layout: 'loggedOut'});

  });

  router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('register', {layout: 'loggedOut'});
  });



module.exports = router;