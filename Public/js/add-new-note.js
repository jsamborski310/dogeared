// CREATE A BOOK NOTE
const createNewNote = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#form-note-title").value.trim();
  const description = document.querySelector("#form-note-details").value.trim();

  const book_id = document.getElementById("form_submit_btn").value;
  console.log("fields", title, description, book_id);
  const body = {
    title,
    description,
    book_id,
  };

  if (title && description && book_id) {
    const response = await fetch(`/api/notes`, {
      method: "POST",
      body: JSON.stringify(body),

      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to add new note! Please complete all fields.");
    }
  }
};

// OPTION TO DELETE NOTE
const deleteNote = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert("Failed to delete note");
    }
  }
};

document
  .querySelector(".new-note-form")
  .addEventListener("submit", createNewNote);
