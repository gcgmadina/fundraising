import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export function createInvoiceFromPurchaseReceipt (purchase_receipt, mode_of_payment) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.create_invoice_from_purchase_receipt",
            params: {
                purchase_receipt_id: purchase_receipt,
                mode_of_payment: mode_of_payment
            },
            onSuccess: (response) => {
                resolve(response);
            },
            onError: (error) => {
                console.error("Error creating invoice from purchase receipt:", error);
                reject(error);
            }
        });
        resource.reload();  // Memastikan resource di-reload setelah inisialisasi
    });
}