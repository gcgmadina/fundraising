import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

// const bankResource = createResource({
//     url: "non_profit.api.fundraising.get_bank_list",
//     transform(data) {
//         for (let i in data) {
//             bankList.push(data[i]);
//         }
//     }
// });

// export const bankList = reactive([]);

export function getBankList() {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "GET",
            url: "non_profit.api.fundraising.get_bank_list",
            transform(data) {
                resolve(data);
            },
            onError: (error) => {
                reject(error);
            }
        });
        resource.reload();  // Memastikan resource di-reload setelah inisialisasi
    });
}

const bankAccountResource = createResource({
    url: "non_profit.api.fundraising.get_bank_account_list",
    auto: true,
    realtime: true,
    transform(data) {
        for (let i in data) {
            bankAccountList.push(data[i]);
        }
    }
});

export const bankAccountList = reactive([]);

export function getBankById(bankId) {
    return createResource({
        method: "GET",
        url: "non_profit.api.fundraising.get_bank_account_by_id",
        auto: true,
        realtime: true,
        params: {
            bank_account_id: bankId
        },
        transform(data) {
            return data;
        }
    });
}

export function editBankAccount(bankAccount) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.edit_bank_account",
            auto: true,
            realtime: true,
            params: {
                bank_account: bankAccount
            },
            onSuccess: (response) => {
                console.log("Successfully edited bank account:", response);
                resolve(response);
            },
            onError: (error) => {
                console.error("Error editing bank account:", error);
                reject(error);
            }
        });
        resource.reload();  // Memastikan resource di-reload setelah inisialisasi
    });
}