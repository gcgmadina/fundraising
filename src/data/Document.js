import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export function deleteDocument(doctype, docname) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.delete_document",
            auto: true,
            realtime: true,
            params: {
                doctype: doctype,
                docname: docname
            },
            onSuccess: (response) => {
                console.log("Successfully deleted document:", response);
                resolve(response);
            },
            onError: (error) => {
                console.error("Error deleting document:", error);
                reject(error);
            }
        });
    });
}