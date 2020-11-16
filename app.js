import { request } from './dataStorage.js';
import { addItemToDom, getItemFromDb } from './events.js';

request.onsuccess = () => {
  addItemToDom();
  getItemFromDb();
}
