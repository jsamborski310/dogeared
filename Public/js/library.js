const renderAllBooks = async (event) => {
    event.preventDefault();

};

const renderBooksToRead = async (event) => {
    event.preventDefault();

};

const renderBooksHaveRead = async (event) => {
    event.preventDefault();

};




document
  .querySelector('.all-books-tab')
  .addEventListener('click', renderAllBooks);

document
  .querySelector('.to-read-tab')
  .addEventListener('click', renderBooksToRead);

document
  .querySelector('.have-read-tab')
  .addEventListener('click', renderBooksHaveRead);