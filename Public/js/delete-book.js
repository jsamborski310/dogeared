// Option to delete book
const deleteBook = async (event) => {
    // event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
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
.querySelector('.delete-book')
.addEventListener('submit', deleteBook);
