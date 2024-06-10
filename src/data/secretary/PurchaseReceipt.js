import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const getPurchaseReceiptScroll = () => {
    let data_purchase_receipt = createResource({
        url: "non_profit.api.fundraising.get_purchase_receipt",
        realtime: true,
        transform(data) {
            let count = purchaseReceiptScrollData.length;
            purchaseReceiptDataLength.value = data.length;
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
export const purchaseReceiptDataLength = ref(0);

export function addPurchaseReceipt(items) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.add_purchase_receipt",
            params: {
                items: items,
            },
            onSuccess: (data) => {
                console.log("New purchase receipt created:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error creating new purchase receipt:", error);
                reject(error);
            },
        });
        resource.reload();
    });
}