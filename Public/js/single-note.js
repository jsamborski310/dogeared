const onNoteSelection = (data) => {
    const selectedData =data;
    document.getElementById('note-title').innerHTML = selectedData.title;
    document.getElementById('note-description').innerHTML = selectedData.description;

}
