// Option to delete book
const deleteBook = async (event) => {
    // event.preventDefault();
  
    if (event.currentTarget.hasAttribute('data-id')) {
      const id = event.currentTarget.getAttribute('data-id');
  
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
  

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete book');
      }
    }

  };

document
.querySelector('.delete-button')
.addEventListener('click', deleteBook);
