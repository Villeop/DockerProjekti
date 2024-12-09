async function saveNote() {
    const noteInput = document.getElementById('noteInput');
    const notesList = document.getElementById('notesList');
    const noteText = noteInput.value.trim();
    if (noteText) {
        const response = await fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: noteText })
        });
        if (response.ok) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span class="note-text">${noteText}</span>
                <div>
                    <button class="btn btn-sm btn-warning mr-2" onclick="editNote(this)">Muokkaa</button>
                    <button class="btn btn-sm btn-danger" onclick="removeNote(this)">Poista</button>
                </div>
            `;
            notesList.appendChild(listItem);
            noteInput.value = '';
        } else {
            alert('Failed to save note');
        }
    }
}

async function loadNotes() {
    const notesList = document.getElementById('notesList');
    const response = await fetch('http://localhost:5000/notes');
    const notes = await response.json();
    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span class="note-text">${note[1]}</span>
            <div>
                <button class="btn btn-sm btn-warning mr-2" onclick="editNote(this)">Muokkaa</button>
                <button class="btn btn-sm btn-danger" onclick="removeNote(this)">Poista</button>
            </div>
        `;
        notesList.appendChild(listItem);
    });
}

function editNote(button) {
    const listItem = button.closest('li');
    const noteText = listItem.querySelector('.note-text');
    const currentText = noteText.textContent;
    noteText.innerHTML = `<input type="text" class="form-control" value="${currentText}">`;
    button.textContent = 'Tallenna';
    button.onclick = function() {
        saveEditedNote(this);
    };
}

function saveEditedNote(button) {
    const listItem = button.closest('li');
    const noteInput = listItem.querySelector('input');
    const newText = noteInput.value.trim();
    const noteText = listItem.querySelector('.note-text');

    if (newText) {
        noteText.textContent = newText;
        button.textContent = 'Muokkaa';
        button.onclick = function() {
            editNote(this);
        };
    }
}

function removeNote(button) {
    const listItem = button.closest('li');
    listItem.remove();
}

document.addEventListener('DOMContentLoaded', loadNotes);