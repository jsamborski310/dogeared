// EDIT BOOK DETAILS
const editFormHandler = async (event) => {
  event.preventDefault();

  // GET VALUES FROM BOOK DETAILS
  const title = document.querySelector("#edit-title").value.trim();
  const author = document.querySelector("#edit-author").value.trim();
  const genre = document.querySelector("#edit-genre").selectedOptions[0].value;
  const status = document.querySelector("#edit-status").value.trim();
  const description = document.getElementsByName("edit-book-description")[0]
    .value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/books/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, author, genre, status, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace(`/book/${id}`);
  } else {
    alert("Failed to edit post");
  }
};

document
  .querySelector(".edit-book-form")
  .addEventListener("submit", editFormHandler);
