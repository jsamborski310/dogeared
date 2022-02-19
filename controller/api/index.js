const router = require('express').Router();
//const notesRoutes = require('./notesRoutes');
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');

// router.use('/notes', notesRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);


module.exports = router;
