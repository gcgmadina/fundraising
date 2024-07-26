import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export function get_donation_qr() {
    return new Promise((resolve, reject) => {
        createResource({
            method: "GET",
            url: "non_profit.api.donationqr.get_qr_image",
            auto: true,
            transform(data) {
                if (data["status"] === "success") {
                    console.log("Donation QR:", data["qr_image"]);
                    resolve(data["qr_image"]);  // Resolve the promise with QR image URL
                } else {
                    console.error("Error getting donation QR:", data["message"]);
                    reject(data["message"]);  // Reject the promise with error message
                }
            },
            onError(error) {
                reject(error);  // Reject the promise on error
            }
        });
    });
}
