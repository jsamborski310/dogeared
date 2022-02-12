const sequelize = require('../config/connection');
const { User } = require('../models');

const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();