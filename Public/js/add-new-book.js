const createNewBook = async (event) => {
    event.preventDefault();
  
    const bookTitle = document.querySelector('.form-book-title').value.trim();
    const author = document.querySelector('.form-author-name').value.trim();
    const genre = document.querySelector('.form-genre').value;
    const readStatus = document.querySelector('.form-read-status').value;
  
    if (bookTitle && author && genre && readStatus) {
      const response = await fetch(`/api/new-book`, {
        method: 'POST',
        body: JSON.stringify({ bookTitle, author, genre, readStatus }),

        // This may need edit?
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/new-book');
      } else {
        alert('Failed to add new book! Please complete all fields.');
      }
    }
  };

// Option to delete book
const deleteBook = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/new-book/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// Wrap '.new-book-form' div around New Book Form html
document
  .querySelector('.new-book-form')
  .addEventListener('submit', createNewBook);

// Option to delete book
document
  .querySelector('.book-list')
  .addEventListener('click', deleteBook);
