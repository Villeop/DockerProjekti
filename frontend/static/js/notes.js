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
                <span class="note-text" style="white-space: pre-wrap;">${noteText}</span>
                <div>
                    <button class="btn btn-sm btn-warning mr-2" onclick="editNote(this)">Muokkaa</button>
                    <button class="btn btn-sm btn-danger" onclick="removeNote(this)">Poista</button>
                </div>
            `;
            notesList.insertBefore(listItem, notesList.firstChild);
            noteInput.value = '';
        } else {
            alert('Tallennus epäonnistui');
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
            <span class="note-text" style="white-space: pre-wrap;">${note[1]}</span>
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
    noteText.innerHTML = `<textarea class="form-control" rows="5" style="resize: vertical; width: 100%;">${currentText}</textarea>`;
    button.textContent = 'Tallenna';
    button.onclick = function() {
        saveEditedNote(this);
    };
}

function saveEditedNote(button) {
    const listItem = button.closest('li');
    const noteInput = listItem.querySelector('textarea');
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

function autoExpand(field) {
    field.style.height = 'inherit';
    field.style.height = `${field.scrollHeight}px`;
}

document.addEventListener('DOMContentLoaded', loadNotes);