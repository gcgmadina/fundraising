import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

const bankResource = createResource({
    url: "non_profit.api.fundraising.get_bank_list",
    auto: true,
    realtime: true,
    transform(data) {
        for (let i in data) {
            bankList.push(data[i]);
        }
    }
});

export const bankList = reactive([]);

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