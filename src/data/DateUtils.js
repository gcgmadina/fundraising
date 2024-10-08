import moment from 'moment';

export function formatDateTime(date) {
    const formattedDate = moment(date).format('D MMMM YYYY HH:mm');
    // console.log(formattedDate.month());
    return formattedDate;
}

export function formatDate(date) {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return formattedDate;
}