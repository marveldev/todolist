const allItems = document.querySelector('.all-items');

class Button {
  constructor(selector, idName, displayProperty) {
    this.selector = selector;
    this.idName = idName;
    this.displayProperty = displayProperty;
  }

  toggleModalDisplay() {
    const buttonGroup = document.querySelectorAll(this.selector)
    const self = this
    buttonGroup.forEach( button => {
      button.addEventListener('click', function() {
        const elementIds = JSON.parse(button.title);
        const modal = document.querySelector(`#${elementIds[self.idName]}`)
        modal.style.display = self.displayProperty;
      })
    })
  }

  removeItem() {
    const buttons = document.querySelectorAll('.confirm');
    buttons.forEach( (button) => {
      button.addEventListener('click', function() {
        const elementIds = JSON.parse(button.title)
        const itemDiv = document.querySelector(`#${elementIds.itemId}`)
        allItems.removeChild(itemDiv);
      })
    });
  }

  editItem() {
    const modalForms = document.querySelectorAll('.edit-form');
    modalForms.forEach( (modalForm) => {
      modalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newInputValue = modalForm.firstElementChild.value;
        const elementIds = JSON.parse(modalForm.title);
        const itemDiv = document.querySelector(`#${elementIds.itemId}`);
        const itemTextSpan = itemDiv.firstElementChild;
        itemTextSpan.innerText = newInputValue;
        const editModal = modalForm.parentElement;
        editModal.style.display = 'none';
      });
    })
  }

  markAsComplete() {
    const markAsCompleteButtons = document.querySelectorAll('.completed');
    markAsCompleteButtons.forEach( (markAsCompleteButton) => {
      markAsCompleteButton.addEventListener('click', function() {
        const elementIds = JSON.parse(markAsCompleteButton.title)
        const itemDiv = document.querySelector(`#${elementIds.itemId}`)
        if (itemDiv.style.backgroundColor == 'rgb(1, 163, 101)') {
          itemDiv.style.backgroundColor = '#008b8b';
        } else {
          itemDiv.style.backgroundColor = 'rgb(1, 163, 101)';
        };
      });
    });
  }
}

class TodoList {
  constructor() {
    this.form = document.querySelector('.todo-form');
    this.form.addEventListener('submit', this.addTodoItemDiv);
  }

  addTodoItemDiv(event) {
    event.preventDefault();
    const itemId = 'id' + Math.random().toString(36).substring(7);
    const deleteModalId = 'id' + Math.random().toString(36).substring(7);
    const editModalId = 'id' + Math.random().toString(36).substring(7);

    const titleProperty = JSON.stringify({ itemId, deleteModalId, editModalId });

    this.input = document.querySelector('.input');
    const inputValue = this.input.value;

    const editModal = `
      <div class="edit-container" id=${editModalId}>
        <form class="edit-form" title=${titleProperty}>
          <input type="text" class="modal-input" value="${inputValue}" placeholder="enter new item here..." />
          <button type="button" class="modal-cancel-button" title=${titleProperty}>CANCEL</button>
          <button type="submit" class="edit-modal-button">OK</button>
        </form>
      </div>
    `;

    const deleteModal = `
      <div class="delete-container" id=${deleteModalId}>
        <div class="modal-container">
          <p class="modal-content">ARE YOU SURE?</p>
          <button type="button" class="confirm button" title=${titleProperty}>YES</button>
          <button type="button" class="cancel button" title=${titleProperty}>NO</button>
        </div>
      </div>
    `;

    const itemDiv = `
      <div class="item-div" id=${itemId}>
        <span class="item-text">${inputValue}</span>
        <span class="button-container">
          <button class="edit button" title=${titleProperty}><i class="fa fa-edit"></i></button>
          ${editModal}
          <button class="delete button" title=${titleProperty}><i class="fa fa-trash"></i></button>
          ${deleteModal}
          <button class="completed button" title=${titleProperty}><i class="fa fa-check"></i></button>
        </span>
      </div>
    `;

    allItems.innerHTML += itemDiv;
    this.input.value = '';

    const openDeleteModalButton = new Button('.delete', 'deleteModalId', 'block');
    const closeDeleteModalButton = new Button('.cancel', 'deleteModalId', 'none');
    const openEditModalButton = new Button('.edit', 'editModalId', 'block');
    const closeEditModalButton = new Button('.modal-cancel-button', 'editModalId', 'none');
    const button = new Button();

    openDeleteModalButton.toggleModalDisplay()
    closeDeleteModalButton.toggleModalDisplay()
    openEditModalButton.toggleModalDisplay()
    closeEditModalButton.toggleModalDisplay()
    button.removeItem();
    button.editItem();
    button.markAsComplete();
  }
}

new TodoList();
