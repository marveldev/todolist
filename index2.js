const input = document.querySelector('.input');
const form = document.querySelector('.todo-form');
const allItems = document.querySelector('.all-items');

function displayElement(id) {
  const element = document.getElementById(id);
  element.style.display = 'block';
}

function addCompleteEventListener() {
  const markAsCompleteButtons = document.querySelectorAll('.completed');
  markAsCompleteButtons.forEach( (markAsCompleteButton) => {
    markAsCompleteButton.addEventListener('click', function() {
      const modal = markAsCompleteButton.parentElement.parentElement;
      
      if (modal.style.backgroundColor == 'rgb(1, 163, 101)') {
        modal.style.backgroundColor = '#008b8b';
      } else {
        modal.style.backgroundColor = 'rgb(1, 163, 101)';
      };
    });
  });
};

function addDeleteButtonEventListener() {
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach( (deleteButton) => {
    deleteButton.addEventListener('click', function() {
      const modal = deleteButton.nextElementSibling;
      modal.style.display = 'block';
    });
  });
}

function addCancelButtonEventListener() {
  const cancelButtons = document.querySelectorAll('.cancel');
  cancelButtons.forEach( (cancelButton) => {
    cancelButton.addEventListener('click', function() {
      const modal = cancelButton.parentElement.parentElement;
      modal.style.display = 'none';
    })
  });
}

// This confirms the deletion of the item from the todo-list. 
function addConfirmButtonEventListener() {
  const confirmButtons = document.querySelectorAll('.confirm');
  confirmButtons.forEach( (confirmButton) => {
    confirmButton.addEventListener('click', function() {
      const itemDiv = confirmButton.parentElement.parentElement.parentElement.parentElement;
      const deleteContainer = confirmButton.parentElement.parentElement;
      const dataStore = JSON.parse(localStorage.getItem('dataStore'));
      // deleteContainer.title returns the data index
      const singleDataIndex = dataStore.findIndex(data => data.index == deleteContainer.title);
      console.log(dataStore.splice(singleDataIndex, 1))
      localStorage.setItem('dataStore', JSON.stringify(dataStore));
      allItems.removeChild(itemDiv);
    })
  });
}

function addEditButtonEventListener() {
  const editButtons = document.querySelectorAll('.edit');
  editButtons.forEach( (editButton) => {
    editButton.addEventListener('click', function() {
      const editButtonId = editButton.nextElementSibling.id;
      displayElement(editButtonId);
    });
  });
}

function addModalCancelButtonEventListener() {
  const modalCancelButtons = document.querySelectorAll('.modal-cancel-button');
  modalCancelButtons.forEach( (modalCancelButton) => {
    modalCancelButton.addEventListener('click', function() {
      const modal = modalCancelButton.parentElement.parentElement;
      modal.style.display = 'none';
    })
  });
} 

function addEditModalFormEventListener() {
  const modalForms = document.querySelectorAll('.edit-form');
  modalForms.forEach( (modalForm) => {
    modalForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const newInputValue = modalForm.firstElementChild.value;
      const itemTextSpan = modalForm.parentElement.parentElement.parentElement.firstElementChild;
      itemTextSpan.innerText = newInputValue;
      
      const editModal = modalForm.parentElement;
      const dataStore = JSON.parse(localStorage.getItem('dataStore'));
      const singleDataIndex = dataStore.findIndex(data => data.index == editModal.id);
      dataStore[singleDataIndex].inputValue = newInputValue;
      localStorage.setItem('dataStore', JSON.stringify(dataStore));
      editModal.style.display = 'none';
    });
  })
}

let index = localStorage.getItem('index') || 0;

const dataStore = JSON.parse(localStorage.getItem('dataStore')) || [];

// [{"0":"cooking"},{"1":"to dance"},{"2":"eat chicken"},{"3":"go to market"}]

// [{index: 0, value: "cooking"}, {index: 1, value: "to dance"}, {index: 2, value: "eat chicken"},{index: 3, value: "go to market"}]

dataStore.map(data => {
  const editModal = `
    <div class="edit-container" id=${data.index}>
      <form class="edit-form">
        <input type="text" class="modal-input" value="${data.inputValue}" placeholder="enter new item here..." />
        <button type="button" class="modal-cancel-button">CANCEL</button>
        <button type="submit" class="edit-modal-button">OK</button>
      </form>
    </div>
  `;

  const deleteModal = `
    <div class="delete-container" title=${data.index}>
      <div class="modal-container">
        <p class="modal-content">ARE YOU SURE?</p>
        <button type="button" class="confirm button">YES</button>
        <button type="button" class="cancel button">NO</button>
      </div>
    </div>
  `;

  const itemDiv = `
    <div class="item-div">
      <span class="item-text">${data.inputValue}</span>
      <span class="button-container">
        <button class="edit button"><i class="fa fa-edit"></i></button>
        ${editModal}
        <button class="delete button"><i class="fa fa-trash"></i></button>
        ${deleteModal}
        <button class="completed button"><i class="fa fa-check"></i></button>
      </span>
    </div>
  `;
  
  allItems.innerHTML += itemDiv;
})

addCompleteEventListener();
addDeleteButtonEventListener();
addCancelButtonEventListener();
addConfirmButtonEventListener();
addEditButtonEventListener();
addModalCancelButtonEventListener();
addEditModalFormEventListener();

function addItemToDom(event) {
  event.preventDefault();
  if (input.value.trim().length > 4) {
    const inputValue = input.value.trim();

    const editModal = `
      <div class="edit-container" id=${index}>
      <form class="edit-form">
      <input type="text" class="modal-input" value="${inputValue}" placeholder="enter new item here..." />
      <button type="button" class="modal-cancel-button">CANCEL</button>
      <button type="submit" class="edit-modal-button">OK</button>
      </form>
      </div>
    `;

    const deleteModal = `
      <div class="delete-container" title=${index}>
        <div class="modal-container">
          <p class="modal-content">ARE YOU SURE?</p>
          <button type="button" class="confirm-button">YES</button>
          <button type="button" class="cancel-button">NO</button>
        </div>
      </div>
    `;

    const itemDiv = `
      <div class="item-div">
      <span class="item-text">${inputValue}</span>
      <span class="button-container">
      <button class="edit button"><i class="fa fa-edit"></i></button>
      ${editModal}
      <button class="delete button"><i class="fa fa-trash"></i></button>
      ${deleteModal}
      <button class="completed button"><i class="fa fa-check"></i></button>
      </span>
      </div>
    `;
    
    allItems.innerHTML += itemDiv;
    input.value = '';
    
    addEditButtonEventListener();
    addModalCancelButtonEventListener();
    addEditModalFormEventListener();
    addDeleteButtonEventListener();
    addCancelButtonEventListener();
    addConfirmButtonEventListener()
    addCompleteEventListener();
    
    const indexValuePair = {
      index: index,
      inputValue: inputValue
    };
    
    let dataStore = JSON.parse(localStorage.getItem('dataStore')) || [];
    
    dataStore.push(indexValuePair);
    localStorage.setItem('dataStore', JSON.stringify(dataStore));
    
    index++
    localStorage.setItem('index', index);
  } else {
    alert('Please enter a valid value.');
  }
}

form.addEventListener('submit', addItemToDom);
