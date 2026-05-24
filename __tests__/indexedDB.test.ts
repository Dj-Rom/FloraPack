
import IndexedDBManager from '../indexedDB';
import { PackagingListInterface } from '../../App';

// Mock IndexedDB
const mockStore = {
  put: vi.fn(),
  delete: vi.fn(),
  getAll: vi.fn(),
};

const mockTransaction = {
  objectStore: vi.fn(() => mockStore),
  onerror: null,
};

const mockDB = {
  transaction: vi.fn(() => mockTransaction),
  objectStoreNames: { contains: vi.fn(() => false) },
  createObjectStore: vi.fn(),
  deleteObjectStore: vi.fn(),
};

const mockRequest = {
  result: mockDB,
  onupgradeneeded: null as any,
  onsuccess: null as any,
  onerror: null as any,
  error: null,
};

vi.stubGlobal('indexedDB', {
  open: vi.fn(() => {
    setTimeout(() => {
      if (mockRequest.onsuccess) mockRequest.onsuccess();
    }, 0);
    return mockRequest;
  }),
});

// Helper — simulate successful request
function mockSuccess(request: any, result: any = undefined) {
  setTimeout(() => {
    request.result = result;
    if (request.onsuccess) request.onsuccess();
  }, 0);
}

describe('IndexedDBManager', () => {
  let manager: IndexedDBManager;

  beforeEach(() => {
    manager = new IndexedDBManager();
    vi.clearAllMocks();

    // Reset indexedDB.open mock to trigger onsuccess
    (indexedDB.open as any).mockImplementation(() => {
      setTimeout(() => {
        if (mockRequest.onsuccess) mockRequest.onsuccess();
      }, 0);
      return mockRequest;
    });
  });

  // ✅ Test 1 — openDatabase returns IDBDatabase
  describe('openDatabase()', () => {
    it('should open and return database', async () => {
      const db = await manager.openDatabase();
      expect(db).toBe(mockDB);
    });

    it('should reject on error', async () => {
      (indexedDB.open as any).mockImplementationOnce(() => {
        setTimeout(() => {
          if (mockRequest.onerror) mockRequest.onerror();
        }, 0);
        return { ...mockRequest, error: new Error('DB Error') };
      });

      await expect(manager.openDatabase()).rejects.toBeDefined();
    });
  });

  // ✅ Test 2 — saveItems
  describe('saveItems()', () => {
    it('should save items to store', async () => {
      const mockItems: PackagingListInterface[] = [
        { id: 1, name: 'Box A', quantity: 10 } as any,
        { id: 2, name: 'Box B', quantity: 5 } as any,
      ];

      const putRequest = { onsuccess: null as any, onerror: null, error: null };
      mockStore.put.mockImplementation(() => {
        setTimeout(() => {
          if (putRequest.onsuccess) putRequest.onsuccess();
        }, 0);
        return putRequest;
      });

      await manager.saveItems(mockItems);

      expect(mockStore.put).toHaveBeenCalledTimes(2);
      expect(mockStore.put).toHaveBeenCalledWith(mockItems[0]);
      expect(mockStore.put).toHaveBeenCalledWith(mockItems[1]);
    });

    it('should handle empty list without errors', async () => {
      await expect(manager.saveItems([])).resolves.toBeUndefined();
      expect(mockStore.put).not.toHaveBeenCalled();
    });
  });

  // ✅ Test 3 — deleteItem
  describe('deleteItem()', () => {
    it('should delete item by id', async () => {
      const deleteRequest = { onsuccess: null as any, onerror: null, error: null };
      mockStore.delete.mockImplementation(() => {
        setTimeout(() => {
          if (deleteRequest.onsuccess) deleteRequest.onsuccess();
        }, 0);
        return deleteRequest;
      });

      await manager.deleteItem(1);

      expect(mockStore.delete).toHaveBeenCalledWith(1);
    });

    it('should handle delete error gracefully', async () => {
      const deleteRequest = {
        onsuccess: null as any,
        onerror: null as any,
        error: new Error('Delete failed'),
      };
      mockStore.delete.mockImplementation(() => {
        setTimeout(() => {
          if (deleteRequest.onerror) deleteRequest.onerror();
        }, 0);
        return deleteRequest;
      });

      // Should not throw — error is caught internally
      await expect(manager.deleteItem(99)).resolves.toBeUndefined();
    });
  });

  // ✅ Test 4 — getAllItems
  describe('getAllItems()', () => {
    it('should return all items', async () => {
      const mockItems = [
        { id: 1, name: 'Box A' },
        { id: 2, name: 'Box B' },
      ];

      const getAllRequest = {
        result: mockItems,
        onsuccess: null as any,
        onerror: null,
        error: null,
      };
      mockStore.getAll.mockImplementation(() => {
        setTimeout(() => {
          if (getAllRequest.onsuccess) getAllRequest.onsuccess();
        }, 0);
        return getAllRequest;
      });

      const result = await manager.getAllItems();

      expect(result).toEqual(mockItems);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array on error', async () => {
      const getAllRequest = {
        result: null,
        onsuccess: null as any,
        onerror: null as any,
        error: new Error('Read failed'),
      };
      mockStore.getAll.mockImplementation(() => {
        setTimeout(() => {
          if (getAllRequest.onerror) getAllRequest.onerror();
        }, 0);
        return getAllRequest;
      });

      const result = await manager.getAllItems();
      expect(result).toEqual([]);
    });
  });
});
