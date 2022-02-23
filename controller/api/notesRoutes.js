const router = require('express').Router();

const { Book, Notes} = require('../../models');



router.get('/', async (req, res) => {
    try {
      const notesData = await Notes.findAll(
        req.body
  );
  
      console.log(notesData)
      res.status(200).json(notesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const notesData = await Notes.findByPk(req.params.id, {
        
      });
  
      if (!notesData) {
        res.status(404).json({ message: 'No notes found' });
        return;
      }
  
      res.status(200).json(notesData);
    } catch (err) {
      res.status(500).json(err)
    }
  });


// CREATE a notes
router.post('/', async (req, res) => {
    try {
      const book_id = req.session.book_id;
      console.log("req" , req.user ,)
      
      
      const notesData = await Notes.create({
        book_id,
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
      
      
      });
  

  
      res.status(200).json(notesData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  // PUT update a book
router.put('/:id', async (req, res) => {
    try {
      const notesData = await Notes.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!notesData[0]) {
        res.status(404).json({ message: 'No note with this id!' });
        return;
      }
      res.status(200).json(notesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const notesData = await Notes.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!notesData) {
      res.status(404).json({ message: 'No note found with that id!' });
      return;
    }

    res.status(200).json(notesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;