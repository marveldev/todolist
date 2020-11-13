import { request } from './dataStorage.js';
import formEventlisteners from './index.js';

request.onsuccess = () => {
  formEventlisteners();
  console.log('ok');
}


