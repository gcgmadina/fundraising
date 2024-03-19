import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const totalResource = createResource({
    url: "non_profit.api.fundraising.get_total_amount",
    auto: true,
    realtime: true,
    // cache: "non_profit:totalResource",
    transform(data) {
        let [d, m, y] = get_date()
        const objData = {'title': 'Rp.' + data, 'subtitle': "Total Donasi", 'content': '1 - ' + d + ' ' + m + ' ' + y}
        cards.value.push(objData)
        return data;
    }
});

export const totalJumatan = createResource({
  url: "non_profit.api.fundraising.get_jumatan_donations",
  auto: true,
  realtime: true,
  transform(data) {
      let [d, m, y] = formatDate(data[1])
      const objData = {'title': 'Rp. ' + data[0], 'subtitle': "Donasi Jum'atan", 'content': d + " " + m + " " + y}
      cards.value.push(objData)
      return data;
  }
});

export function get_date() {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  let today = new Date();
  let d = today.getDate();
  let m = months[today.getMonth()];
  let y = today.getFullYear();
  return [d, m, y]
}

function formatDate(dateString) {
  const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dateParts = dateString.split("-");
  const day = parseInt(dateParts[2], 10);
  const monthIndex = parseInt(dateParts[1]) - 1;
  const year = parseInt(dateParts[0]);

  return [day, months[monthIndex], year]
}

export function get_last_friday() {
  let today = new Date();
  let lastFriday= today.getDate() - (today.getDay() - 5) - 7;
  return lastFriday
}

export const cards = ref([])