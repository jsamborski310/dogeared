const router = require('express').Router();
const { Book, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // get the  DB
    // get he user and its books
    //render the page based on the data
    console.log(req.body)
    
    const bookData = await Book.findAll({where : { isCommon : true }}
      );


    // Serialize data so the template can read it
    const books = bookData.map((book) => book.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('start', { 
      books,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ////////////////
// Change to get books/:id?

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: [
        'title',
        'author',
        'genre',
        'has_read',
        'image'
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


///////////////////////





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


  router.get('/add-new-book', async (req,res) => {
   
    res.render('add-new-book', { 
  
    });
  
  })
  ;
module.exports = router;