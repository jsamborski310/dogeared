const router = require('express').Router();
const {book} = require('../../models');

// GET all books
router.get('/', async (req, res) => {
  try {
    const bookData = await book.findAll({
      
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single book
router.get('/:id', async (req, res) => {
  try {
    const bookData = await book.findByPk(req.params.id, {
      
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
router.post('/', async (req, res) => {
  try {
    const bookData = await book.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a book
router.put('/:id', async (req, res) => {
    try {
      const bookData = await book.update(req.body, {
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
    const bookData = await book.destroy({
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