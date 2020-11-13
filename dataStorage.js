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

const addEntryToDb = (entry) => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite');
  const store = transaction.objectStore('todoList')
  store.add(entry);

  transaction.oncomplete = () => {
    alert('success')
  }

  transaction.onerror = () => {
    console.log(`error adding to todoList`)
  }
}

export { request, addEntryToDb };