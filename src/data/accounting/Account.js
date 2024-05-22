import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const receivableAccountResource = () => {
    let data_receivable_account = createResource({
        url: "non_profit.api.fundraising.get_receivable_account",
        realtime: true,
        transform(data) {
            for (let i in data) {
                receivableAccountData.push(data[i]);
            }
        }
    })

    data_receivable_account.reload();
}

export const receivableAccountData = reactive([]);

export const cashBankAccountResource = () => {
    let data_cash_bank_account = createResource({
        url: "non_profit.api.fundraising.get_cash_bank_account",
        realtime: true,
        transform(data) {
            for (let i in data) {
                cashBankAccountData.push(data[i]);
            }
        }
    })

    data_cash_bank_account.reload();
}

export const cashBankAccountData = reactive([]);