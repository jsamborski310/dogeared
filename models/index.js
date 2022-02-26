const User = require('./User');
const Book = require('./Book')
const Notes = require('./notes')

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

Book.hasMany(Notes, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE'

});

Notes.belongsTo(Book, {
  foreignKey: 'book_id'

});




module.exports = { User, Book, Notes };
