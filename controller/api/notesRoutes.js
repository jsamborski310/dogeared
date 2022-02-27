const router = require('express').Router();

const { Notes } = require('../../models');



router.get('/:book_id', async (req, res) => {
    try {
      const notesData = await Notes.findAll(
        {
          where : {
            book_id : req.params.book_id
          }
        }
  );
  
      console.log(notesData)
      res.status(200).json(notesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// router.get('/:id', async (req, res) => {
//     try {
//       const notesData = await Notes.findByPk(req.params.id, {
        
//       });
  
//       if (!notesData) {
//         res.status(404).json({ message: 'No notes found' });
//         return;
//       }
  
//       res.status(200).json(notesData);
//     } catch (err) {
//       res.status(500).json(err)
//     }
//   });



router.post('/', async (req, res) => {
    try {
        
     
      const notesData = await Notes.create({
    ...req.body
      
      
      });
  

  
      res.status(200).json(notesData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });



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