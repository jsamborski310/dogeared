const sequelize = require('../config/connection');
const book  = require('../models/Book');

const User = require('../models/User');

const bookData = require('./bookData.json');
const userData = require('./userData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await book.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });



  



  process.exit(0);
};



seedDatabase();