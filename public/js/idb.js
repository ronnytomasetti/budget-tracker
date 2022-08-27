console.log('Loading idb.js');

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;
const request = indexedDB.open("budget-tracker", 1);

request.onsuccess = ({ target }) => {
  db = target.result;
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('pending', { autoIncrement: true });
};

function saveRecord(record) {
  const transaction = db.transaction(['pending'], 'readwrite');
  const store = transaction.objectStore('pending');

  console.log('in saveRecord', record);
  store.add(record);
}
