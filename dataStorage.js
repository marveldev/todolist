const request = indexedDB.open('todoList', 2);

request.onsuccess = () => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite')
  const store = transaction.objectStore('todoList');
  store.add({text: 'This is a sample Text', userPhoto: 'This is a sample image'})
}

request.onupgradeneeded = () => {
  const database = request.result;
  database.createObjectStore('todoList', { keyPath: 'itemId' });
}

request.onerror = () => {
  console.log('request unsuccessful');
}

const displayMessage = (selector) => {
  const message = document.querySelector(selector);
  message.style.display = 'block';

  setTimeout(() => {
    message.style.display = 'none';
  }, 4000);

  const messageButton = message.lastElementChild;
  messageButton.addEventListener('click', () => {
    message.style.display = 'none';
  })
}

const addEntryToDb = (entry) => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite');
  const store = transaction.objectStore('todoList')
  store.add(entry);

  transaction.oncomplete = () => {
    displayMessage('#entryMessage');
  }

  transaction.onerror = () => {
    console.log(`error adding to todoList`)
  }
}

const getEntryFromDb = () => {
  const data = new Promise((resolve, reject) => {
    const database = request.result
    const transaction = database.transaction(['todoList']);
    const store = transaction.objectStore('todoList')
    const getData = store.getAll();

    getData.onsuccess = () => {
      resolve(getData.result)
    }

    getData.onerror = () => {
      console.log(`error adding to 'item'`)
      reject(getData.error);
    }
  })
  return Promise.resolve(data);
}

const updateEntry = (itemId, newinputValue) => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite');
  const store = transaction.objectStore('todoList');
  const getData = store.get(itemId);

  getData.onsuccess = () => {
    const data = getData.result;
    data.inputValue = newinputValue;
    store.put(data);
    displayMessage('#updateMessage');
  }

  getData.onerror = () => {
    console.log('error accessing getdata');
  }
}

const updateBackground = (itemId, newBackgroundColor) => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite');
  const store = transaction.objectStore('todoList');
  const getData = store.get(itemId);

  getData.onsuccess = () => {
    const data = getData.result;
    data.backgroundColor = newBackgroundColor;
    store.put(data);
  }

  getData.onerror = () => {
    console.log('error accessing getdata');
  }
}

const deleteEntry = (entryId) => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite');
  const store = transaction.objectStore('todoList');
  store.delete(entryId)
}

export { request, addEntryToDb, getEntryFromDb, deleteEntry,
updateEntry, updateBackground, displayMessage };
