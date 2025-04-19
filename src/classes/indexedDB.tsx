import { PackagingListInterface } from "../App";

interface IndexedDBManager {
    openDatabase(): Promise<IDBDatabase>;
    saveItems(packagingList: PackagingListInterface[]): Promise<void>;
    deleteItem(id: number): Promise<void>;
    getAllItems(): Promise<any>;
}

class IndexedDBManager implements IndexedDBManager {
    private dbName: string = 'Database';
    private dbVersion: number = 5;
    private storeName: string = 'Packaging_list';

    openDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (db.objectStoreNames.contains(this.storeName)) {
                    db.deleteObjectStore(this.storeName);
                }
                db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
            };

            request.onsuccess = () => {
                resolve(request.result as IDBDatabase);
            };

            request.onerror = () => {
                console.error('Error opening database:', request.error);
                reject(request.error);
            };
        });
    }

    async saveItems(packagingList: PackagingListInterface[]): Promise<void> {
        try {
            const db = await this.openDatabase();
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);

            for (const item of packagingList) {
                const saveRequest = store.put(item); // Replaces existing entry if same `id`
                await new Promise<void>((resolve, reject) => {
                    saveRequest.onsuccess = () => resolve();
                    saveRequest.onerror = () => reject(saveRequest.error);
                });               
            }

            transaction.onerror = () => {
                console.error('Transaction failed:', transaction.error);
            };
        } catch (error) {
            console.error('Error saving items:', error);
        }
    }

    async deleteItem(id: number): Promise<void> {
        try {
            const db = await this.openDatabase();
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const deleteRequest = store.delete(id);

            await new Promise<void>((resolve, reject) => {
                deleteRequest.onsuccess = () => resolve();
                deleteRequest.onerror = () => reject(deleteRequest.error);
            });

            transaction.onerror = () => {
                console.error('Transaction failed:', transaction.error);
            };
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    async getAllItems(): Promise<any> {
        try {
            const db = await this.openDatabase();
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const getAllRequest = store.getAll();

            return await new Promise<any>((resolve, reject) => {
                getAllRequest.onsuccess = () => resolve(getAllRequest.result);
                getAllRequest.onerror = () => reject(getAllRequest.error);
            });
        } catch (error) {
            console.error('Error getting items:', error);
            return [];
        }
    }
}

export default IndexedDBManager;
