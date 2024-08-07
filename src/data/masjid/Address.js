import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

// URL API base
const BASE_URL = 'https://api.myquran.com/v2/sholat';

// Fungsi untuk mendapatkan daftar semua kota
export function fetchAllCities() {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/kota/semua`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error = new Error('Failed to fetch cities');
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

// Fungsi untuk mencari kota berdasarkan nama
export function searchCity(cityName) {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/kota/cari/${encodeURIComponent(cityName)}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error = new Error('Failed to search city');
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

// Fungsi untuk mendapatkan jadwal sholat harian untuk kota tertentu
export function fetchPrayerSchedule(cityId, date = new Date().toISOString().split('T')[0]) {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/jadwal/${cityId}/${date}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error = new Error('Failed to fetch prayer schedule');
                    reject(error);
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function addAddress(address, is_mosque = false) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: 'POST',
            url: 'non_profit.api.address.input_address',
            params: {
                address: address,
                is_mosque: is_mosque,
            },
            transform(data) {
                if (data.status === 'success') {
                    data.message = "Alamat berhasil ditambahkan";
                    resolve(data.message);
                } else {
                    const error = new Error(data.message || "Gagal menambahkan alamat");
                    error.data = data;
                    reject(error);
                }
            }
        });
        resource.reload();
    });
}

export function getMosqueAddress() {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: 'GET',
            url: 'non_profit.api.address.get_permanent_address',
            transform(data) {
                if (data.status === 'success') {
                    resolve(data.data[0]);
                } else {
                    const error = new Error(data.message || "Gagal mendapatkan alamat masjid");
                    error.data = data;
                    reject(error);
                }
            }
        });
        resource.reload();
    });
}

// Fungsi untuk mendapatkan latitude dan longitude lokasi saat ini
export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                error => {
                    console.error(error);
                    reject(error);
                }
            );
        } else {
            const error = new Error('Geolocation is not supported by this browser');
            reject(error);
        }
    });
}

export function userPrayerSchedule(latitude, longitude) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    // Peta untuk mengubah nama waktu sholat ke dalam bahasa Indonesia
    const prayerNamesMap = {
        Fajr: "subuh",
        Sunrise: "terbit",
        Dhuhr: "dzuhur",
        Asr: "ashar",
        Sunset: "terbenam",
        Maghrib: "maghrib",
        Isha: "isya",
        Imsak: "imsak",
        Midnight: "tengah_malam",
        Firstthird: "sepertiga_malam_pertama",
        Lastthird: "sepertiga_malam_terakhir"
    };

    return new Promise((resolve, reject) => {
        fetch(`http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error = new Error('Failed to fetch prayer schedule');
                    reject(error);
                }
            })
            .then(data => {
                const timings = data.data[day - 1].timings;
                const modifiedTimings = {};

                for (const [key, value] of Object.entries(timings)) {
                    if (prayerNamesMap[key]) {
                        modifiedTimings[prayerNamesMap[key]] = value.replace(' (WIB)', '');
                    }
                }

                resolve(modifiedTimings);
            })
            .catch(error => {
                reject(error);
            });
    });
}

