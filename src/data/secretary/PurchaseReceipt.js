import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const getPurchaseReceiptScroll = () => {
    let data_purchase_receipt = createResource({
        url: "non_profit.api.fundraising.get_purchase_receipt",
        realtime: true,
        transform(data) {
            let count = purchaseReceiptScrollData.length;
            for (let i = 0; i < 5; i++) {
                if (i + count < data.length)
                    purchaseReceiptScrollData.push(data[i + count]);
                else
                    break;
            }
        }
    })

    data_purchase_receipt.reload();
}

export const purchaseReceiptScrollData = reactive([]);