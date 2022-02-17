const User = require('./User');
const Book = require('./book')

// User.hasMany(Book, {
//   foreignKey: 'user_id'
// });

User.hasMany(Book);

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Book };
