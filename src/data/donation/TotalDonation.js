import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

// export const totalResource = createResource({
//     url: "non_profit.api.fundraising.get_total_amount",
//     auto: true,
//     realtime: true,
//     // cache: "non_profit:totalResource",
//     transform(data) {
//         let [d, m, y] = get_date()
//         const objData = {'title': 'Rp.' + data, 'subtitle': "Total Donasi", 'content': '1 - ' + d + ' ' + m + ' ' + y}
//         cards.value.push(objData)
//         return data;
//     }
// });

export const totalJumatan = createResource({
  url: "non_profit.api.fundraising.get_jumatan_donations",
  auto: true,
  realtime: true,
  transform(data) {
    let [d, m, y] = formatDate(data[1])
    if (data != null) {
      const objData = { 'title': 'Rp. ' + data[0], 'subtitle': "Infaq Jum'at", 'content': d + " " + m + " " + y }
      cards.value.push(objData)
    }
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
  let lastFriday = today.getDate() - (today.getDay() - 5) - 7;
  return lastFriday
}

export const getDonationByType = createResource({
  url: "non_profit.api.fundraising.get_donation_by_type",
  auto: true,
  realtime: true,
  transform(data) {
    // console.log(data)
    let [d, m, y] = get_date()
    for (let i in data) {
      // console.log(i, " ", data[i])
      if (data[i] == 0 && i != "Jum'atan") {
        continue
      }

      let day
      if (d != 1)
        day = '1 - ' + d
      else
        day = d

      let objData;
      if (i === "Hibah") {
        objData = {
          'title': data[i] + ' Orang',
          'subtitle': i,
          'content': day + ' ' + m + ' ' + y
        };
      } else {
        objData = {
          'title': 'Rp. ' + data[i],
          'subtitle': i,
          'content': day + ' ' + m + ' ' + y
        };
      }

      cards.value.push(objData);
    }
    return data;
  }
});

export const cards = ref([])