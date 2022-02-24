const router = require('express').Router();
const { Book, User } = require('../models');
const withAuth = require('../utils/auth');


// LOGIN
router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect(307, '/');
    return;
  }

  res.render('login', {layout: 'loggedOut'});

});

// REGISTER
router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect(307, '/start');
    return;
  }
  res.render('register', {layout: 'loggedOut'});
});

// REGISTER START PAGE
router.get('/start', withAuth, async (req, res) => {
  try {
    
    const bookData = await Book.findAll({
      where : { 
        isCommon : true 
      },
      attributes: [
        'title',
        'author',
        'genre',
        'has_read',
        'image',
        'description'
      ],
    },

);
    const books = bookData.map((book) => book.get({ plain: true }));


    res.render('start', { 
      books,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// HOMEPAGE PAGE
router.get('/', withAuth, async (req, res) => {
  try {
    
    const bookData = await Book.findAll({
      attributes: [
        'title',
        'author',
        'genre',
        'has_read',
        'image',
        'description'
      ],
    },

);
    const books = bookData.map((book) => book.get({ plain: true }));


    res.render('homepage', { 
      books,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// SINGLE BOOK
router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: [
        'title',
        'author',
        'genre',
        'has_read',
        'image',
        'description'
      ],
    });

    const book = bookData.get({ plain: true });

    res.render('book', {
      ...book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// // ADD NEW BOOK
//   router.get('/add-new-book', async (req,res) => { 
//     res.render('add-new-book', { 
//     });
//   });

  // ABOUT
  router.get('/about', async (req,res) => {  
    res.render('about', {  
    });
  });

// ADD NEW BOOK LIBRARY SIDEBAR
router.get('/add-new-book', withAuth, async (req, res) => {
  try {
    
    const bookData = await Book.findAll({
      attributes: [
        'title',
        'author',
        'genre',
        'has_read',
        'image',
        'description'
      ],
    },

);
    const books = bookData.map((book) => book.get({ plain: true }));


    res.render('add-new-book', { 
      books,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;