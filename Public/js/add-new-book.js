

const createNewBook = async (event) => {
    event.preventDefault();
    console.log("im triggeredddddddddddddddddddddddd");  
    const bookTitle = document.querySelector('#form-book-title').value.trim();
    const author = document.querySelector('#form-author-name').value.trim();
    const genre = document.querySelector('#form-genre').value;
    const readStatus = document.querySelector('#form-read-status').value;
    const bookCover = document.querySelector('#form-book-cover').files[0]

    console.log("here are the values",bookTitle , author, genre , readStatus , bookCover);
    let formData = new FormData();
    formData.append('image' , (bookCover));
    formData.append('title' , (bookTitle));
    formData.append('author' , (author));
    formData.append('genre' , (genre));
    formData.append('has_read' , (readStatus));
    if (bookTitle && author && genre && readStatus && bookCover) {
      
      const response = await fetch(`/api/books`, {
        method: 'POST',
        body: formData,

        mode: "no-cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "form-data"
              },

        // This may need edit?
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add new book! Please complete all fields.');
      }
    }
  };



// Option to delete book
const deleteBook = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/books/${id}`, {
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

