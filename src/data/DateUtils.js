import moment from 'moment';
import 'moment/dist/locale/id';

// Set bahasa Indonesia secara global
moment.locale('id');

export function formatDate(date, weekday = true) {
    if (weekday) {
        return moment(date).format('dddd, D MMMM YYYY');
    }else{
        return moment(date).format('D MMMM YYYY');
    }
}

export function formatDateTime(date) {
    return moment(date).format('D MMMM YYYY HH:mm');
}

export async function hijriDate(date) {
    const formattedDate = moment(date).format("DD-MM-YYYY");

    try {
        const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${formattedDate}`);
        if (!response.ok) {
            throw new Error("Failed to fetch Hijri date");
        }

        const data = await response.json();
        // console.log(data)

        const weekday = data.data.hijri.weekday.en
        const day = data.data.hijri.day
        const month = data.data.hijri.month.en
        const year = data.data.hijri.year

        return `${weekday}, ${day} ${month} ${year}`; // Mengembalikan hasilnya
    } catch (error) {
        console.error(error);
        return "Error"; // Tampilkan pesan error jika gagal
    }
}
