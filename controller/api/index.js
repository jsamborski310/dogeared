const router = require('express').Router();
const notesRoutes = require('./notesRoutes');
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');


router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/notes', notesRoutes);


module.exports = router;
