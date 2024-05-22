import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const paymentEntryResource = () => {
    let data_payment_entry = createResource({
        url: "non_profit.api.fundraising.get_payment_entries",
        realtime: true,
        transform(data) {
            let count = paymentEntryData.length;
            paymentEntryDataLength.value = data.length;
            for (let i = 0; i < 5; i++) {
                if (i + count < data.length)
                    paymentEntryData.push(data[i + count]);
                else
                    break;
            }
        }
    })

    data_payment_entry.reload();
}

export const paymentEntryData = reactive([]);
export const paymentEntryDataLength = ref(0);

export function createPaymentEntry (paymentEntry) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "GET",
            url: "non_profit.non_profit.custom_doctype.payment_entry.get_donation_payment_entry",
            params: {
                dt: 'Donation',
                dn: paymentEntry
            },
            onSuccess: (response) => {
                console.log("Payment data prepared:", response);
                resolve(response);
                addPaymentEntry(response).then(resolve).catch(reject);
            },
            onError: (error) => {
                console.error("Error fetching payment entry data:", error);
                reject(error);
            }
        });
        resource.reload();  // Memastikan resource di-reload setelah inisialisasi
    });
}

export function addPaymentEntry(paymentData) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.add_donation_payment_entry",
            params: {
                payment_entry: paymentData,
            },
            onSuccess: (response) => {
                resolve(response);
            },
            onError: (error) => {
                reject(error);
            }
        });
        resource.reload();
    });
}