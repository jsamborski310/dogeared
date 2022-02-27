const router = require('express').Router();
const { Book, User, Notes } = require('../models');
const withAuth = require('../utils/auth');


// REGISTER
router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect(307, '/start');
    return;
  }
  res.render('register', { layout: 'loggedOut' });
});


// LOGIN
router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect(307, '/');
    return;
  }

  res.render('login', { layout: 'loggedOut' });

});

// REGISTER START PAGE > GET PRE-SELECTED BOOKS
router.get('/start', withAuth, async (req, res) => {
  try {

    const bookData = await Book.findAll({
      where: {
        isCommon: true
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


// HOMEPAGE LIBRARY > GET ALL BOOKS
router.get('/', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const bookData = await Book.findAll({
      where: {
        user_id
      }
      ,
      order: [['title', 'ASC']],
      attributes: [
        'id',
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


// SINGLE BOOK DETAILS > GET SINGLE BOOK DATA
router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'author',
        'genre',
        'has_read',
        'image',
        'description'
      ],
    });

    const notesData = await Notes.findAll(
      {
        where: {
          book_id : req.params.id
        }
      }
    );
    const notes = notesData.map((note) => note.get({ plain: true }));
    const book = bookData?.get({ plain: true }) || {};

    res.render('book', {
      ...book,
      logged_in: req.session.logged_in,
      noOfNotes : notes.length
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// ADD NEW BOOK > LIBRARY SIDEBAR > GET ALL BOOKS
router.get('/add-new-book', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const bookData = await Book.findAll({
      where : {
        user_id
      },
      order: [['createdAt', 'DESC']],

      attributes: [
        'id',
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


// ADD NEW BOOK NOTE > SIDEBAR > GET ALL NOTES FOR SPECIFIC BOOK
router.get('/add-new-note/:book_id', async (req, res) => {
  const book_id = req.params.book_id;

  const notesData = await Notes.findAll(
    {
      where: {
        book_id
      }
    }
  );
  const notes = notesData.map((note) => note.get({ plain: true }));
  const bookData = await Book.findOne({
    where: {
      id: book_id
    }
  })
  const book = bookData?.get({ plain: true }) || {};
  res.render('add-new-note', { book_id: req.params.book_id, notes, book, logged_in: req.session.logged_in })
});

// SINGLE BOOK NOTE > GET SINGLE NOTE & SIDEBAR > GET ALL NOTES
router.get('/single-note/:book_id', async (req, res) => {
  const book_id = req.params.book_id;

  const bookData = await Book.findOne({
    where: {
      id: book_id
    }
  })
  const book = bookData?.get({ plain: true }) || {};

  const notesData = await Notes.findAll(
    {
      where: {
        book_id
      }
    }
  );
  const notes = notesData.map((note) => note.get({ plain: true }));
  
  res.render('single-note', { notes , book, logged_in: req.session.logged_in })
});


// BOOK NOTES > GET ALL NOTES FOR SPECIFIC BOOK
router.get('/book-notes/:book_id', async (req, res) => {
  const book_id = req.params.book_id;

  const bookData = await Book.findOne({
    where: {
      id: book_id
    }
  })
  const book = bookData?.get({ plain: true }) || {};

  const notesData = await Notes.findAll(
    {
      where: {
        book_id
      }
    }
  );
  const notes = notesData.map((note) => note.get({ plain: true }));
 
  res.render('book-notes', { notes , book, logged_in: req.session.logged_in })
});


// EDIT BOOK > GET BOOK DATA
router.get('/book/edit/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      title: req.body.title,
      content: req.body.content
    },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },

      });

    const book = bookData.get({ plain: true });

    res.render('edit-book', {
      ...book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// EDIT BOOK PAGE > SIDEBAR > GET ALL BOOKS 
router.get('/book/edit/:id', withAuth, async (req, res) => {
  try {

    const bookData = await Book.findAll({

      attributes: [
        'id',
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

    res.render('edit-book', {
      books,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ABOUT
router.get('/about', async (req, res) => {
  res.render('about', {
    logged_in: req.session.logged_in
  });
});


module.exports = router;