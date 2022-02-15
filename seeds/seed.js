const sequelize = require('../config/connection');
const book  = require('../models/book');

const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await book.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};



seedDatabase();