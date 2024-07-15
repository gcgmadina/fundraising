import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export function getReportData(filters = null) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            url: "non_profit.api.report.report_data",
            method: "GET",
            auto: true,
            params: {
                filters: JSON.stringify(filters)
            },
            onError: (error) => {
                console.error("Error fetching report data:", error);
                reject(error);
            },
            onSuccess: (response) => {
                console.log("Report data prepared:", response);
                resolve(response);
            }
        });
        resource.reload();
    });
}