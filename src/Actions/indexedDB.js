// import CryptoJS from 'crypto-js';

// // Function to initialize the IndexedDB database
// export const initializeIndexedDB = () => {
//     return new Promise((resolve, reject) => {
//         const request = window.indexedDB.open('myDatabase', 2); // Increment the version if schema changes

//         request.onerror = (event) => {
//             console.error('Failed to open IndexedDB:', event.target.error);
//             reject(event.target.error);
//         };

//         request.onsuccess = (event) => {
//             // The database has been successfully opened
//             resolve();
//         };

//         request.onupgradeneeded = (event) => {
//             const db = event.target.result;
//             // Create object store if it does not already exist
//             if (!db.objectStoreNames.contains('userData')) {
//                 db.createObjectStore('userData', { keyPath: 'key' });
//                 console.log('IndexedDB object store created');
//             }
//         };
//     });
// };

// // Function to store data in IndexedDB
// export const storeDataInIndexedDB = async (key, value) => {
//     await initializeIndexedDB(); // Initialize the IndexedDB

//     return new Promise((resolve, reject) => {
//         const request = window.indexedDB.open('myDatabase', 2); // Ensure version matches

//         request.onerror = (event) => {
//             console.error('Failed to open IndexedDB:', event.target.error);
//             reject(event.target.error);
//         };

//         request.onsuccess = (event) => {
//             const db = event.target.result;

//             if (!db.objectStoreNames.contains('userData')) {
//                 return reject(new Error('Object store "userData" not found'));
//             }

//             const transaction = db.transaction(['userData'], 'readwrite');
//             const objectStore = transaction.objectStore('userData');

//             try {
//                 const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
//                 const encryptedValue = CryptoJS.AES.encrypt(stringValue, 'secret').toString();

//                 const getRequest = objectStore.get(key);

//                 getRequest.onsuccess = (event) => {
//                     const existingData = event.target.result;
//                     if (existingData) {
//                         existingData.value = encryptedValue;
//                         const updateRequest = objectStore.put(existingData);
//                         updateRequest.onsuccess = () => resolve();
//                         updateRequest.onerror = (event) => reject(event.target.error);
//                     } else {
//                         const addRequest = objectStore.add({ key: key, value: encryptedValue });
//                         addRequest.onsuccess = () => resolve();
//                         addRequest.onerror = (event) => reject(event.target.error);
//                     }
//                 };
//             } catch (error) {
//                 console.error('Encryption error:', error);
//                 reject(error);
//             }
//         };
//     });
// };

// // Function to get user ID from IndexedDB
// export const getUserIDFromIndexedDB = async () => {
//     await initializeIndexedDB(); // Initialize the IndexedDB

//     return new Promise((resolve, reject) => {
//         const request = window.indexedDB.open('myDatabase', 2); // Ensure version matches

//         request.onerror = (event) => {
//             console.error('Failed to open IndexedDB:', event.target.error);
//             reject(event.target.error);
//         };

//         request.onsuccess = (event) => {
//             const db = event.target.result;

//             if (!db.objectStoreNames.contains('userData')) {
//                 return reject(new Error('Object store "userData" not found'));
//             }

//             const transaction = db.transaction(['userData'], 'readonly');
//             const objectStore = transaction.objectStore('userData');

//             const getRequest = objectStore.get('UserId');

//             getRequest.onsuccess = (event) => {
//                 const userData = event.target.result;
//                 if (userData) {
//                     const decryptedUserID = CryptoJS.AES.decrypt(userData.value, 'secret').toString(CryptoJS.enc.Utf8);
//                     resolve(decryptedUserID);
//                 } else {
//                     resolve(null);
//                 }
//             };

//             getRequest.onerror = (event) => {
//                 console.error('Failed to retrieve UserId from IndexedDB:', event.target.error);
//                 reject(event.target.error);
//             };
//         };
//     });
// };

// // Function to get token from IndexedDB
// export const getTokenFromIndexedDB = async () => {
//     await initializeIndexedDB(); // Initialize the IndexedDB

//     return new Promise((resolve, reject) => {
//         const request = window.indexedDB.open('myDatabase', 2); // Ensure version matches

//         request.onerror = (event) => {
//             console.error('Failed to open IndexedDB:', event.target.error);
//             reject(event.target.error);
//         };

//         request.onsuccess = (event) => {
//             const db = event.target.result;

//             if (!db.objectStoreNames.contains('userData')) {
//                 return reject(new Error('Object store "userData" not found'));
//             }

//             const transaction = db.transaction(['userData'], 'readonly');
//             const objectStore = transaction.objectStore('userData');

//             const getRequest = objectStore.get('Token');

//             getRequest.onsuccess = (event) => {
//                 const tokenData = event.target.result;
//                 if (tokenData) {
//                     const decryptedToken = CryptoJS.AES.decrypt(tokenData.value, 'secret').toString(CryptoJS.enc.Utf8);
//                     resolve(decryptedToken);
//                 } else {
//                     resolve(null);
//                 }
//             };

//             getRequest.onerror = (event) => {
//                 console.error('Failed to retrieve Token from IndexedDB:', event.target.error);
//                 reject(event.target.error);
//             };
//         };
//     });
// };

// // Function to delete data from IndexedDB
// export const deleteDataFromIndexedDB = async (key) => {
//     await initializeIndexedDB(); // Initialize the IndexedDB

//     return new Promise((resolve, reject) => {
//         const request = window.indexedDB.open('myDatabase', 2); // Ensure version matches

//         request.onerror = (event) => {
//             console.error('Failed to open IndexedDB:', event.target.error);
//             reject(event.target.error);
//         };

//         request.onsuccess = (event) => {
//             const db = event.target.result;

//             if (!db.objectStoreNames.contains('userData')) {
//                 return reject(new Error('Object store "userData" not found'));
//             }

//             const transaction = db.transaction(['userData'], 'readwrite');
//             const objectStore = transaction.objectStore('userData');

//             const deleteRequest = objectStore.delete(key);

//             deleteRequest.onsuccess = () => {
//                 resolve();
//             };

//             deleteRequest.onerror = (event) => {
//                 console.error(`Failed to remove data with key '${key}' from IndexedDB:`, event.target.error);
//                 reject(event.target.error);
//             };
//         };
//     });
// };

// // Function to get all data from IndexedDB
// export const getAllDataFromIndexedDB = async () => {
//     await initializeIndexedDB(); // Initialize the IndexedDB

//     return new Promise((resolve, reject) => {
//         const request = window.indexedDB.open('myDatabase', 2); // Ensure version matches

//         request.onerror = (event) => {
//             console.error('Failed to open IndexedDB:', event.target.error);
//             reject(event.target.error);
//         };

//         request.onsuccess = (event) => {
//             const db = event.target.result;

//             if (!db.objectStoreNames.contains('userData')) {
//                 return reject(new Error('Object store "userData" not found'));
//             }

//             const transaction = db.transaction(['userData'], 'readonly');
//             const objectStore = transaction.objectStore('userData');
//             const getAllRequest = objectStore.getAll();

//             getAllRequest.onsuccess = () => {
//                 const allData = getAllRequest.result.reduce((acc, record) => {
//                     try {
//                         const decryptedValue = CryptoJS.AES.decrypt(record.value, 'secret').toString(CryptoJS.enc.Utf8);
//                         acc[record.key] = decryptedValue;
//                     } catch (error) {
//                         console.error('Decryption error:', error);
//                     }
//                     return acc;
//                 }, {});
//                 resolve(allData);
//             };

//             getAllRequest.onerror = (event) => {
//                 console.error('Failed to retrieve all data from IndexedDB:', event.target.error);
//                 reject(event.target.error);
//             };
//         };
//     });
// };



// export const checkTokenExists = async () => {
//     const token = await getTokenFromIndexedDB();
//     return !!token;
// };

import CryptoJS from 'crypto-js';

// Function to encrypt data
const encryptData = (data) => {
    try {
        const stringValue = typeof data === 'string' ? data : JSON.stringify(data);
        return CryptoJS.AES.encrypt(stringValue, 'secret').toString();
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
};

// Function to decrypt data
const decryptData = (encryptedData) => {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, 'secret').toString(CryptoJS.enc.Utf8);

        // Try parsing the decrypted data
        try {
            return JSON.parse(decrypted);
        } catch (parseError) {
            // If parsing fails, return the plain string
            return decrypted;
        }
    } catch (error) {
        // console.error('Decryption error:', error);
        throw error;
    }
};


// Function to initialize the "IndexedDB" (no-op for localStorage)
export const initializeIndexedDB = () => {
    return Promise.resolve(); // No need to initialize for localStorage
};

// Function to store data in localStorage
export const storeDataInIndexedDB = async (key, value) => {
    try {
        const encryptedValue = encryptData(value);
        localStorage.setItem(key, encryptedValue);
    } catch (error) {
        console.error('Failed to store data in localStorage:', error);
        throw error;
    }
};

// Function to get user ID from localStorage
export const getUserIDFromIndexedDB = async () => {
    try {
        const encryptedData = localStorage.getItem('UserId');
        return encryptedData ? decryptData(encryptedData) : null;
    } catch (error) {
        console.error('Decryption error for UserId:', error);
        throw error;
    }
};

// Function to get token from localStorage
export const getTokenFromIndexedDB = async () => {
    try {
        const encryptedData = localStorage.getItem('Token');
        return encryptedData ? decryptData(encryptedData) : null;
    } catch (error) {
        console.error('Decryption error for Token:', error);
        throw error;
    }
};

// Function to delete data from localStorage
export const deleteDataFromIndexedDB = async (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Failed to remove data with key '${key}' from localStorage:`, error);
        throw error;
    }
};

// Function to get all data from localStorage
export const getAllDataFromIndexedDB = async () => {
    const allData = {};
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const encryptedData = localStorage.getItem(key);
            if (encryptedData) {
                try {
                    allData[key] = decryptData(encryptedData);
                } catch (error) {
                    // console.error(`Decryption error for key ${key}:`, error);
                }
            }
        }
    } catch (error) {
        console.error('Error while retrieving all data from localStorage:', error);
        throw error;
    }
    return allData;
};

// Function to check if token exists in localStorage
export const checkTokenExists = async () => {
    const token = await getTokenFromIndexedDB();
    return !!token;
};
