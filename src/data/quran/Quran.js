const API_BASE_URL = 'https://equran.id/api/v2';

// Fungsi untuk mengambil daftar surah
export function getSurahList() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/surat`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          const error = new Error('Failed to fetch surah list');
          reject(error);
        }
      })
      .then(data => {
        resolve(data.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Fungsi untuk mengambil isi surah berdasarkan nomor surah
export function getSurahContent(surahNumber) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/surat/${surahNumber}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          const error = new Error(`Failed to fetch content for surah ${surahNumber}`);
          reject(error);
        }
      })
      .then(data => {
        resolve(data.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
