const createNewBook = async (event) => {
    event.preventDefault();
     
    const bookTitle = document.querySelector('#form-book-title').value.trim();
    const author = document.querySelector('#form-author-name').value.trim();
    const genre = document.querySelector('#form-genre').value;
    const readStatus = document.querySelector('#form-read-status').value;
    const description = document.querySelector('#form-book-description').value;
    const bookCover = document.querySelector('#form-book-cover').files[0]

    console.log("here are the values",bookTitle , author, genre , readStatus , description,  bookCover);
    let formData = new FormData();
    formData.append('image' , (bookCover));
    formData.append('title' , (bookTitle));
    formData.append('author' , (author));
    formData.append('genre' , (genre));
    formData.append('has_read' , (readStatus));
    formData.append('description' , (description));
    if (bookTitle && author && genre && readStatus && description && bookCover) {
      
      const response = await fetch(`/api/books`, {
        method: 'POST',
        body: formData,

        mode: "no-cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "form-data"
              },

      });
  
      if (response.ok) {
        // document.location.replace('/');
        document.location.reload();
      } else {
        alert('Failed to add new book! Please complete all fields.');
      }
    }
  };


// Wrap '.new-book-form' div around New Book Form html
document
  .querySelector('.new-book-form')
  .addEventListener('submit', createNewBook);

