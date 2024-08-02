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
                console.log("response 1: ", response);
                console.log("cityName: ", cityName);
                if (response.ok) {
                    return response.json();
                } else {
                    const error = new Error('Failed to search city');
                    reject(error);
                }
            })
            .then(data => {
                console.log("data 1: ", data);
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
                    resolve(data.message);
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