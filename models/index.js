const book = require('./User')
const notes = require('./notes')

book.hasOne(notes, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE',
});

notes.belongsTo(book, {
    foreignKey: 'book_id',
});


module.exports = {book,notes};