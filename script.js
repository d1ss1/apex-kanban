const btnAdd = document.querySelector('.btn-add');
const modalOverlay = document.querySelector('.modal-overlay');
const btnCreate = document.querySelector('.btn-create');
const btnCancel = document.querySelector('.btn-cancel');
const modalInput = document.querySelector('.modal-input');
const todoList = document.querySelector('#todo-list');


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


btnCreate.addEventListener('click', function() {
    const taskText = modalInput.value.trim();

    if (taskText === '') {
        alert('Enter the problem text first!')
        return;
    }

    const newCard = document.createElement('div');
    newCard.classList.add('kanban-card');

    newCard.innerHTML = `<p>${taskText}</p>`;

    todoList.appendChild(newCard);

    modalInput.value = ''
    modalOverlay.style.display = 'none'
});
