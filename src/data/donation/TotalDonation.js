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
      let [d, m, y] = get_date()
      let lastFriday = get_last_friday()
      const objData = {'title': 'Rp. ' + data, 'subtitle': "Donasi Jum'atan", 'content': lastFriday + ' ' + m + ' ' + y}
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

export function get_last_friday() {
  let today = new Date();
  let lastFriday= today.getDate() - (today.getDay() - 5) - 7;
  return lastFriday
}

// const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// var date = new Date(), y = date.getFullYear(), m = months[date.getMonth()], d = date.getDate();
// var lastFriday= date.getDate() - (date.getDay() - 5) - 7;

export const cards = ref([])

// const cards = [
//   { title: totalResource.data, subtitle: 'Total Donasi', content: '1 - ' + d + ' ' + m + ' ' + y },
//   { title: totalJumatan.data, subtitle: "Donasi Jum'atan", content: lastFriday + ' ' + m + ' ' + y },
// ];