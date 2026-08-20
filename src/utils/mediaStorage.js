/**
 * IndexedDB Media Storage Manager
 * Stores raw uploaded video/image files locally inside the browser's IndexedDB database
 * so uploaded files persist across refreshes without requiring a backend server!
 */

const DB_NAME = "ShamvilMediaStorage";
const STORE_NAME = "media_blobs";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e);
  });
}

/**
 * Saves a File or Blob into IndexedDB by ID
 */
export async function saveMediaBlob(id, fileOrBlob) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(fileOrBlob, id);
      tx.oncomplete = () => resolve(id);
      tx.onerror = (e) => reject(e);
    });
  } catch (err) {
    console.error("Error saving blob to IndexedDB", err);
    return null;
  }
}

/**
 * Retrieves a Blob from IndexedDB by ID and returns an active Blob URL
 */
export async function getMediaBlobUrl(id) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        const result = req.result;
        if (result && (result instanceof Blob || result instanceof File)) {
          resolve(URL.createObjectURL(result));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.error("Error loading blob from IndexedDB", err);
    return null;
  }
}

/**
 * Deletes a Blob from IndexedDB by ID
 */
export async function deleteMediaBlob(id) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (err) {
    return false;
  }
}

/**
 * Generates a PNG poster data URL snapshot from an uploaded video file
 */
export function generateVideoPoster(videoFile) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(videoFile);
    video.muted = true;
    video.playsInline = true;

    video.onloadeddata = () => {
      // Seek to 1s or middle of video for poster frame
      video.currentTime = Math.min(1.0, video.duration / 2);
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch (e) {
        resolve('');
      }
    };

    video.onerror = () => {
      resolve('');
    };
  });
}
