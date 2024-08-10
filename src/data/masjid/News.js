import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

// URL API base
const BASE_URL = 'non_profit.api.news';

export function fetchAllNews(start = 0, limit = 10) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            url: `${BASE_URL}.get_news`,
            method: 'GET',
            params: {
                start: start,
                limit: limit
            },
            transform(data) {
                if (data.status === 'success') {
                    resolve(data.data);
                } else {
                    const error = new Error(data.message || "Gagal mendapatkan berita");
                    error.data = data;
                    reject(error);
                }
            }
        })

        resource.reload();
    });
}

export function createNews(news_data) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            url: `${BASE_URL}.add_news`,
            method: 'POST',
            params: {
                news: news_data
            },
            transform(data) {
                if (data.status === 'success') {
                    resolve(data.message);
                } else {
                    const error = new Error(data.message || "Gagal menambahkan berita");
                    error.data = data;
                    reject(error);
                }
            }
        })

        resource.reload();
    });
}

export function fetchNews(news_id) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            url: `${BASE_URL}.get_news_by_name`,
            method: 'GET',
            params: {
                news_id: news_id
            },
            transform(data) {
                if (data.status === 'success') {
                    resolve(data.data);
                } else {
                    const error = new Error(data.message || "Gagal mendapatkan berita");
                    error.data = data;
                    reject(error);
                }
            }
        })

        resource.reload();
    });
}