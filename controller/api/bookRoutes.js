const router = require('express').Router();
const { upload } = require('../../common/multer');
const {User, Book} = require('../../models');

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
    res.status(500).json(err);
  }
});

// CREATE a book
router.post('/', upload.single('image'), async (req, res) => {
    try {
  
      const bookData = await Book.create({
        user_id: req.body.user_id,
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        has_read: req.body.has_read,
        image: req.body.image
      });
  
      if (req.file) {
        req.body.picture = req.file.filename
        bookData.image = req.file.filename
    }

  //   if (!req.file) {
  //     console.log("No file upload");
  //   } else {
  //     console.log(req.file.filename)
  //     var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
  //     var insertData = "INSERT INTO book(file_src)VALUES(?)"
  //     db.query(insertData, [imgsrc], (err, result) => {
  //         if (err) throw err
  //         console.log("file uploaded")
  //     })
  // }
  
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
router.delete('/:id', async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
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
});

module.exports = router;