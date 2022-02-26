const createNewNote = async (event) => {
    event.preventDefault();
    
    const noteTitle = document.querySelector('#form-note-title').value.trim();
    const noteDescription = document.querySelector('#form-note-details').value.trim();


    
    let formData = new FormData();
    formData.append('title' , (noteTitle));
    formData.append('description' , (noteDescription));
    if (noteTitle && noteDescription) {
      
      const response = await fetch(`/api/notes`, {
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
        alert('Failed to add new note! Please complete all fields.');
      }
    }
  };


// Option to delete book
const deleteNote = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete note');
    }
  }
};


document
  .querySelector('.new-note-form')
  .addEventListener('submit', createNewNote);




