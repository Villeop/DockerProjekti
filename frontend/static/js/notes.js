async function saveNote() {
    const noteInput = document.getElementById('noteInput');
    const notesList = document.getElementById('notesList');
    const noteText = noteInput.value.trim();
    if (noteText) {
        const response = await fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: noteText })
        });
        if (response.ok) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = noteText;
            notesList.appendChild(listItem);
            noteInput.value = '';
        } else {
            alert('Failed to save note');
        }
    }
}

async function loadNotes() {
    const notesList = document.getElementById('notesList');
    const response = await fetch('/notes');
    const notes = await response.json();
    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = note[1]; // Assuming note text is in the second column
        notesList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', loadNotes);