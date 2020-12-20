import { addEntryToDb, deleteEntry, getEntryFromDb, updateEntry, updateBackground, displayMessage }
from './dataStorage.js';

const formEventlisteners = () => {
  const displayModal = (selector, value) => {
    const modal = document.querySelector(selector);
    modal.style.display = value;
  }

  const markAsCompleteEventListener = () => {
    const markAsCompleteButtons = document.querySelectorAll('.completed');
    markAsCompleteButtons.forEach( (markAsCompleteButton) => {
      markAsCompleteButton.addEventListener('click', () => {
        const elementIds = JSON.parse(markAsCompleteButton.title)
        const itemDiv = document.querySelector(`#${elementIds.itemId}`)
        if (itemDiv.style.backgroundColor == 'rgb(1, 163, 101)') {
          itemDiv.style.backgroundColor = '#008b8b';
          updateBackground(elementIds.itemId, '#008b8b');
        } else {
          itemDiv.style.backgroundColor = 'rgb(1, 163, 101)';
          updateBackground(elementIds.itemId, 'rgb(1, 163, 101)');
        };
      });
    });
  };

  const addDeleteButtonEventListener = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach( (deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const elementIds = JSON.parse(deleteButton.title)
        displayModal(`#${elementIds.deleteModalId}`, 'block');
      });
    });

    const cancelButtons = document.querySelectorAll('.cancel');
    cancelButtons.forEach( (cancelButton) => {
      cancelButton.addEventListener('click', () => {
        const elementIds = JSON.parse(cancelButton.title)
        displayModal(`#${elementIds.deleteModalId}`, 'none');
      });
    });

    const allItems = document.querySelector('.all-items');
    const confirmButtons = document.querySelectorAll('.confirm');
    confirmButtons.forEach( (confirmButton) => {
      confirmButton.addEventListener('click', () => {
        const elementIds = JSON.parse(confirmButton.title)
        const itemDiv = document.querySelector(`#${elementIds.itemId}`)
        allItems.removeChild(itemDiv);
        deleteEntry(elementIds.itemId)
      })
    });
  }

  const addEditButtonEventListener = () => {
    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach( (editButton) => {
      editButton.addEventListener('click', () => {
        const elementIds = JSON.parse(editButton.title);
        displayModal(`#${elementIds.editModalId}`, 'block');
      });
    });

    const cancelButtons = document.querySelectorAll('.cancel-editBtn');
    cancelButtons.forEach( (cancelButton) => {
      cancelButton.addEventListener('click', () => {
        const elementIds = JSON.parse(cancelButton.title);
        displayModal(`#${elementIds.editModalId}`, 'none');
      })
    });

    const editModalForms = document.querySelectorAll('.edit-form');
    editModalForms.forEach( (editModalForm) => {
      editModalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const elementIds = JSON.parse(editModalForm.title);
        const newInput = document.querySelector(`.${elementIds.editModalId}`);
        const newInputValue = newInput.value;
        if (newInputValue.trim().length >= 4) {
          const editModal = editModalForm.parentElement;
          const inputValue = document.querySelector(`.${elementIds.itemId}`);
          inputValue.innerText = newInputValue;
          editModal.style.display = 'none';
          updateEntry(elementIds.itemId, newInputValue);
        } else {
          displayMessage('#inputMessage');
        }
      });
    })
  }

  markAsCompleteEventListener();
  addDeleteButtonEventListener();
  addEditButtonEventListener();

  document.querySelector('.input').addEventListener('keydown', () => {
    console.log('ok');
    document.querySelector('.input').style.height = "1px";
    document.querySelector('.input').style.height = (3+document.querySelector('.input').scrollHeight)+"px";
  })

  const itemTexts = document.querySelectorAll('.item-text')
  for (let index = 0; index < itemTexts.length; index++) {
    const itemText = itemTexts[index];
    itemText.addEventListener('mouseover', () => {
      itemText.parentElement.nextElementSibling.style.display = 'block';
    })

    itemText.addEventListener('mouseout', () => {
      itemText.parentElement.nextElementSibling.style.display = 'none';
    })
  }
}

const addItemToDom = () => {
  const form = document.querySelector('.todo-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const itemId = 'id' + Date.parse(new Date()).toString();
    const deleteModalId = 'id' + Math.random().toString(36).substring(7);
    const editModalId = 'id' + Math.random().toString(36).substring(7);
    const titleProperty = JSON.stringify({ itemId, deleteModalId, editModalId });
    const input = document.querySelector('.input');
    const allItems = document.querySelector('.all-items');
    const inputValue = input.value;

    if (inputValue.trim().length >= 4) {
      const editModal = `
        <div class="edit-container" id=${editModalId}>
          <form class="edit-form" title=${titleProperty}>
            <input type="text" class="edit-input ${editModalId}" value="${inputValue}"
            placeholder="enter new item here..." />
            <div>
              <button type="button" class="cancel-editBtn" title=${titleProperty}>CANCEL</button>
              <button type="submit" class="confirm-editBtn">OK</button>
            </div>
          </form>
        </div>
      `;

      const deleteModal = `
        <div class="delete-container" id=${deleteModalId}>
          <div class="delete-modal">
            <p>ARE YOU SURE?</p>
            <button type="button" class="confirm button" title=${titleProperty}>YES</button>
            <button type="button" class="cancel button" title=${titleProperty}>NO</button>
          </div>
        </div>
      `;

      let itemDiv = `
        <div class="item-container">
          <div class="item-div" id=${itemId}>
            <span class="item-text ${itemId}">${inputValue}</span>
            <span class="button-container">
              <button class="edit button" title=${titleProperty}>
              <i class="fa fa-edit"></i></button>
              ${editModal}
              <button class="delete button" title=${titleProperty}>
              <i class="fa fa-trash"></i></button>
              ${deleteModal}
              <button class="completed button" title=${titleProperty}>
              <i class="fa fa-check"></i></button>
            </span>
          </div>
          <div class="overflow-text">
            <span class="">${inputValue}</span>
            <div class="arrow-down"></div>
          </div>
        </div>
      `;

      itemDiv += allItems.innerHTML;
      allItems.innerHTML = itemDiv;
      input.value = '';

      formEventlisteners();

      const addItemToIndexDb = {
        itemId: itemId,
        deleteModalId: deleteModalId,
        editModalId: editModalId,
        inputValue: inputValue,
        backgroundColor: '#008b8b'
      }
      addEntryToDb(addItemToIndexDb);
    } else {
      displayMessage('#inputMessage');
    }
  })
}

const getItemFromDb = async () => {
  const allItems = document.querySelector('.all-items');
  const todoList = await getEntryFromDb();
  const listItems = todoList.reverse().map((listItem) => {
    const titleProperty = JSON.stringify({
      itemId: listItem.itemId,
      deleteModalId: listItem.deleteModalId,
      editModalId: listItem.editModalId
    });

    const { itemId, editModalId, deleteModalId, inputValue, backgroundColor } = listItem;

    const editModal = `
      <div class="edit-container" id=${editModalId}>
        <form class="edit-form" title=${titleProperty}>
          <div id="modalInput">
            <input type="text" class="modal-input ${editModalId}" value="${inputValue}"
            placeholder="enter new item here..." />
          </div>
          <button type="button" class="cancel-editBtn" title=${titleProperty}>CANCEL</button>
          <button type="submit" class="confirm-editBtn">OK</button>
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

    return `
      <div class="item-container">
        <div class="item-div" id=${itemId} style="background-color: ${backgroundColor}">
          <span class="item-text ${itemId}">${inputValue}</span>
          <span class="button-container">
            <button class="edit button" title=${titleProperty}><i class="fa fa-edit"></i></button>
            ${editModal}
            <button class="delete button" title=${titleProperty}><i class="fa fa-trash"></i></button>
            ${deleteModal}
            <button class="completed button" title=${titleProperty}>
            <i class="fa fa-check"></i></button>
          </span>
        </div>
        <div class="overflow-text">
          <div class="arrow-up"></div>
          <span class="">${inputValue}</span>
        </div>
      </div>
    `
  });

  allItems.innerHTML = listItems.join('');

  formEventlisteners();
}

export { addItemToDom, getItemFromDb };
