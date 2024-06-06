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

export function getDocumentById(doctype, docname) {
    return new Promise((resolve, reject) => {
        createResource({
            method: "GET",
            url: "non_profit.api.fundraising.get_document",
            auto: true,
            realtime: true,
            params: {
                doctype: doctype,
                docname: docname
            },
            transform(data) {
                resolve(data);
            },
            error(error) {
                reject(error);
            }
        });
    });
}

export function cancelDocument(doctype, docname) {
    return new Promise((resolve, reject) => {
        createResource({
            method: "POST",
            url: "non_profit.api.fundraising.cancel_document",
            auto: true,
            realtime: true,
            params: {
                doctype: doctype,
                docname: docname
            },
            onSuccess: (response) => {
                console.log("Successfully cancelled document:", response);
                resolve(response);
            },
            onError: (error) => {
                console.error("Error cancelling document:", error);
                reject(error);
            }
        });
    });
}

export function submitDocument(doctype, docname) {
    return new Promise((resolve, reject) => {
        createResource({
            method: "POST",
            url: "non_profit.api.fundraising.submit_document",
            auto: true,
            realtime: true,
            params: {
                doctype: doctype,
                docname: docname
            },
            onSuccess: (response) => {
                console.log("Successfully submitted document:", response);
                resolve(response);
            },
            onError: (error) => {
                console.error("Error submitting document:", error);
                reject(error);
            }
        });
    });
}