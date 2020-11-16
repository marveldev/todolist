const input = document.querySelector('.input');
const form = document.querySelector('.todo-form');
const allItems = document.querySelector('.all-items'); 

const localStorageIndex = localStorage.getItem('index');
let index = localStorageIndex || 0;

if (localStorageIndex) {
  for (let i = 0; i < localStorageIndex; i++) {
    const item = localStorage.getItem(i);
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-div';
      
    const itemText = document.createElement('span');
    itemText.className = 'item-text';
    itemText.innerText = item;
    itemDiv.appendChild(itemText);
      
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    const deleteIcon = document.createElement("i"); 
    deleteIcon.className = "fa fa-trash"; 
    deleteButton.appendChild(deleteIcon);
      
    const editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.className = 'edit-button';
        
    const completedButton = document.createElement('button');
    completedButton.className = 'completed-button';
    const completedIcon = document.createElement("i"); 
    completedIcon.className = "fa fa-check";
    completedButton.appendChild(completedIcon);
      
    const buttonContainer = document.createElement('span');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(completedButton);
    buttonContainer.appendChild(deleteButton);
      
    itemDiv.appendChild(buttonContainer);

    allItems.appendChild(itemDiv);
  }
}
console.log('index===', localStorageIndex);

function addItemToDom(event) {
  event.preventDefault();
  const inputValue = input.value.trim();
  if (inputValue.length >= 4 ) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-div';
  
    const itemText = document.createElement('span');
    itemText.innerText = inputValue;
    itemText.className = 'item-text';
    itemDiv.appendChild(itemText);
  
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    const deleteIcon = document.createElement("i"); 
    deleteIcon.className = "fa fa-trash"; 
    deleteButton.appendChild(deleteIcon);
  
    const editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.className = 'edit-button';
  
    const completedButton = document.createElement('button');
    completedButton.className = 'completed-button';
    const completedIcon = document.createElement("i"); 
    completedIcon.className = "fa fa-check";
    completedButton.appendChild(completedIcon);

    const buttonContainer = document.createElement('span');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(completedButton);
    buttonContainer.appendChild(deleteButton);
  
    itemDiv.appendChild(buttonContainer);

    //creates edit button modal box
    const modalEditBox = document.createElement('div');
    modalEditBox.className = 'edit-container';

    const formEditBox = document.createElement('form');
    formEditBox.className = 'edit-form';

    const newInputBox = document.createElement('input');
    newInputBox.setAttribute('type' , 'text');
    newInputBox.className = 'modal-input';
    newInputBox.setAttribute('placeholder' , 'enter new item here...');
    newInputBox.setAttribute('required', '');
    newInputBox.value = itemText.innerText; 

    const editModalButton = document.createElement('button');
    editModalButton.className = 'edit-modal-button';
    editModalButton.innerText = 'OK';

    //appends edit button modal box
    formEditBox.appendChild(newInputBox);
    formEditBox.appendChild(editModalButton);
    modalEditBox.appendChild(formEditBox);
    itemDiv.appendChild(modalEditBox);

    //creates the delete element modal box
    const modalDeleteBox = document.createElement('div');
    modalDeleteBox.className = 'delete-container';

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    const modalContent = document.createElement('p');
    modalContent.className = 'modal-content';
    modalContent.innerText = 'ARE YOU SURE?';

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "button-delete";
    buttonDelete.innerText = "YES";

    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.innerText = "CANCEL";

    //appends the delete element modal box
    modalContainer.appendChild(modalContent);
    modalContainer.appendChild(buttonDelete);
    modalContainer.appendChild(cancelButton);
    modalDeleteBox.appendChild(modalContainer);
    itemDiv.appendChild(modalDeleteBox);

    localStorage.setItem(index, (itemText.innerText)); 

    index++

    localStorage.setItem('index', index); 

    console.log('index===', index);

    //appends all the created element to the DOM
    allItems.appendChild(itemDiv);
    input.value = '';
    
    //opens edit modal box
    function openEditModal() {
      modalEditBox.style.display = 'block';
    }

    editButton.addEventListener('click', openEditModal);

    function modalInput(event) {
      event.preventDefault();
      if (newInputBox.value.trim().length >= 4) {
        itemText.innerText =  newInputBox.value;
        modalEditBox.style.display = 'none';
      }
    }
    
    formEditBox.addEventListener('submit', modalInput);

    //styles completed tasks.
    function completedTask() {
      if (itemDiv.style.backgroundColor == 'green') {
        itemDiv.style.backgroundColor = '#008b8b';
      } else {
        itemDiv.style.backgroundColor = 'green';
      }
    }

    completedButton.addEventListener('click', completedTask);

    //opens delete modal box
    function openDeleteModal() {
      modalDeleteBox.style.display = 'block';
    }

    deleteButton.addEventListener('click', openDeleteModal);

    function removeItem() {
      let elementParent = buttonDelete.parentElement.parentElement.parentElement;
      allItems.removeChild(elementParent);
    }

    buttonDelete.addEventListener('click', removeItem);

    function closeDeleteModal() {
      modalDeleteBox.style.display = 'none';
    }

    cancelButton.addEventListener('click', closeDeleteModal);
  }
}

form.addEventListener('submit', addItemToDom);
