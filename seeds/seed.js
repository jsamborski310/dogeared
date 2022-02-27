const sequelize = require("../config/connection");
const Book = require("../models/Book");
const Notes = require("../models/notes");

const User = require("../models/User");

const bookData = require("./bookData.json");
const userData = require("./userData.json");
const notesData = require("./notesData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Book.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });

  await Notes.bulkCreate(notesData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
