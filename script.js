const btnAdd = document.querySelector('.btn-add');
const modalOverlay = document.querySelector('.modal-overlay');
const btnCreate = document.querySelector('.btn-create');
const btnCancel = document.querySelector('.btn-cancel');
const modalInput = document.querySelector('.modal-input');
const todoList = document.querySelector('#todo-list');
const allColumns = document.querySelectorAll('.card-list');


btnAdd.addEventListener('click', function() {
    modalOverlay.style.display = 'flex';
});

btnCancel.addEventListener('click', function() {
    modalOverlay.style.display = 'none';
});


modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});


function createCard(taskText, column) {
    const newCard = document.createElement('div');
    newCard.classList.add('kanban-card');
    newCard.setAttribute('draggable', 'true');

    newCard.innerHTML = `
    <p>${taskText}</p>
    <button class="btn-delete">&times;</button>`;

    newCard.addEventListener('dragstart', function() {
        newCard.classList.add('dragging');
    });

    newCard.addEventListener('dragend', function() {
        newCard.classList.remove('dragging');
    });

        const btnDelete = newCard.querySelector('.btn-delete');
        btnDelete.addEventListener('click', function() {
            newCard.remove()
            saveBoard();
    });
    
    column.appendChild(newCard);
}

btnCreate.addEventListener('click', function() {
    const taskText = modalInput.value.trim();

    if (taskText === '') {
        alert('Enter the problem text first!')
        return;
    }


    createCard(taskText, todoList);
    saveBoard()

    modalInput.value = ''
    modalOverlay.style.display = 'none'
});

allColumns.forEach(function(column) {
    column.addEventListener('dragover', function(event) {
        event.preventDefault()
    });

    column.addEventListener('drop', function() {
        const draggingCard = document.querySelector('.dragging')

        if (draggingCard) {
            column.appendChild(draggingCard);
            saveBoard();
        }
    });
});

function saveBoard() {
    const boardData = {};
    
    allColumns.forEach(function(column) {
        const columnId = column.id;
        boardData[columnId] = [];
        
        const cards = column.querySelectorAll('.kanban-card');
        cards.forEach(function(card) {
            const taskText = card.querySelector('p').textContent;
            boardData[columnId].push(taskText);
        });
    });
    localStorage.setItem('apex-kanban-data', JSON.stringify(boardData));
}

function loadBoard() {
    const savedData = localStorage.getItem('apex-kanban-data');

    if (!savedData) return;

    const boardData = JSON.parse(savedData);

    for (const columnId in boardData) {
        const column = document.getElementById(columnId);
        
        if (!column) continue;

        boardData[columnId].forEach(function(taskText) {
            createCard(taskText, column)
        });
    }
}

loadBoard();
