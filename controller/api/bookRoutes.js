const router = require('express').Router();
const { upload } = require('../../common/multer');
const {User, Book} = require('../../models');
const withAuth = require('../../utils/auth');

// GET all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll(
      req.body
);

    console.log(bookData)
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single book
router.get('/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);filePath
  }
});

// CREATE a book
router.post('/', upload.single('image'), async (req, res) => {
    try {
      const user_id = req.session.user_id;
      console.log("req" , req.user ,)
      var serverUrl = req.protocol + '://' + req.get('host');
      
      const filePath = serverUrl + "/" + req.file.path.split('/').slice(1).join('/');
      
      const bookData = await Book.create({
        user_id,
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        has_read: req.body.has_read,
        description: req.body.description,
        image: filePath
      });
  

  
      res.status(200).json(bookData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// PUT update a book
router.put('/:id', async (req, res) => {
    try {
      const bookData = await Book.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!bookData[0]) {
        res.status(404).json({ message: 'No book with this id!' });
        return;
      }
      res.status(200).json(bookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// DELETE a book
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with that id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;